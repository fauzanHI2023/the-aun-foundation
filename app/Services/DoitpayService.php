<?php

namespace App\Services;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DoitpayService
{
    protected string $baseUrl;
    protected string $clientKey;
    protected string $merchantRef;
    protected string $privateKey;

    public function __construct()
    {
        $this->baseUrl     = rtrim((string) config('doitpay.base_url'), '/');
        $this->clientKey   = (string) config('doitpay.client_key');
        $this->merchantRef = (string) config('doitpay.merchant_ref');

        $privateKeyPath = config('doitpay.private_key_path');

        if (! is_string($privateKeyPath) || ! file_exists($privateKeyPath)) {
            throw new Exception("Doitpay private key not found at [{$privateKeyPath}].");
        }

        $this->privateKey = file_get_contents($privateKeyPath);
    }

    /**
     * ISO-8601 timestamp dengan offset timezone, contoh: 2022-09-16T13:00:00+07:00
     */
    protected function jakartaNow(): \DateTimeImmutable
    {
        return new \DateTimeImmutable(
            'now',
            new \DateTimeZone('Asia/Jakarta')
        );
    }

    protected function timestamp(): string
    {
        return $this->jakartaNow()->format('Y-m-d\TH:i:sP');
    }

    protected function validUpTo(int $minutes = 25): string
    {
        return $this->jakartaNow()
            ->modify("+{$minutes} minutes")
            ->format('Y-m-d\TH:i:sP');
    }

    /**
     * Minify JSON body persis seperti yang dikirim (tanpa spasi/format),
     * lalu SHA-256 dan hex-encode huruf kecil sesuai formula Doitpay.
     */
    protected function bodyHash(string $rawJsonBody): string
    {
        return strtolower(hash('sha256', $rawJsonBody));
    }

    protected function postViaShellCurl(string $endpoint, string $rawJsonBody, array $headerLines): array
    {
        $url = "{$this->baseUrl}{$endpoint}";
        $headerArgs = '';
        foreach ($headerLines as $h) {
            $headerArgs .= ' -H ' . escapeshellarg($h);
        }

        $cmd = 'curl -s -i -X POST ' . escapeshellarg($url)
            . $headerArgs
            . ' -d ' . escapeshellarg($rawJsonBody);

        $output = shell_exec($cmd);

        Log::info('DOITPAY SHELL CURL RAW OUTPUT', ['output' => $output]);

        // parse header vs body
        [$rawHeaders, $body] = explode("\r\n\r\n", $output, 2) + [null, null];

        preg_match('/HTTP\/\d\.\d\s+(\d+)/', $rawHeaders, $m);
        $status = (int) ($m[1] ?? 0);

        if ($status < 200 || $status >= 300) {
            throw new Exception("Doitpay shell-curl failed. HTTP {$status} Body: {$body}");
        }

        return json_decode($body, true);
    }

    /**
     * Signature asimetris (SHA256withRSA) untuk Get Token API.
     * stringToSign = ClientKey + "|" + Timestamp
     */
    protected function asymmetricSignature(string $timestamp): string
    {
        $stringToSign = $this->clientKey.'|'.$timestamp;

        Log::info('DOITPAY STRING TO SIGN (asymmetric/get-token)', [
            'stringToSign' => $stringToSign,
            'clientKey' => $this->clientKey,
            'timestamp' => $timestamp,
        ]);

        $privateKeyResource = openssl_pkey_get_private($this->privateKey);

        if ($privateKeyResource === false) {
            throw new Exception('Doitpay: invalid RSA private key - '.openssl_error_string());
        }

        $signed = openssl_sign($stringToSign, $binarySignature, $privateKeyResource, OPENSSL_ALGO_SHA256);

        if (! $signed) {
            throw new Exception('Doitpay: failed to generate asymmetric signature.');
        }

        return base64_encode($binarySignature);
    }

    /**
     * Signature simetris (HMAC_SHA512) untuk API transaksi (Payment Method API).
     * stringToSign = HttpMethod:Endpoint:AccessToken:LowerHex(SHA256(RequestBody)):Timestamp
     * secretKey = Client Key
     */
    protected function symmetricSignature(string $method, string $endpoint, string $accessToken, string $rawJsonBody, string $timestamp): string
    {
        $stringToSign = $method.':'.$endpoint.':'.$accessToken.':'.$this->bodyHash($rawJsonBody).':'.$timestamp;

        Log::info('DOITPAY STRING TO SIGN (symmetric)', [
            'stringToSign' => $stringToSign,
            'method' => $method,
            'endpoint' => $endpoint,
            'accessToken' => $accessToken,
            'bodyHash' => $this->bodyHash($rawJsonBody),
            'timestamp' => $timestamp,
        ]);

        $hash = hash_hmac('sha512', $stringToSign, $this->clientKey, true);

        return base64_encode($hash);
    }

    /**
     * Ambil Bearer Token (di-cache selama masa berlaku token dikurangi buffer).
     */
    public function getAccessToken(bool $forceRefresh = false): string
    {
        if ($forceRefresh) {
            Cache::forget('doitpay_access_token');
        }

        return Cache::remember('doitpay_access_token', 600, function () {
            $timestamp = $this->timestamp();
            $signature = $this->asymmetricSignature($timestamp);

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'X-TIMESTAMP' => $timestamp,
                'X-SIGNATURE' => $signature,
                'X-CLIENT-KEY' => $this->clientKey,
            ])->post("{$this->baseUrl}/auth/v1.0/access-token/b2b", [
                'grantType' => 'client_credentials',
            ]);

            if (! $response->successful() || empty($response->json('accessToken'))) {
                throw new Exception('Doitpay: failed to get access token - '.$response->body());
            }

            return $response->json('accessToken');
        });
    }

    /**
     * Buat Payment Link untuk donasi.
     *
     * @param  array{
     *   partner_reference_no: string,
     *   amount: float|int|string,
     *   valid_up_to: string,
     *   return_url: string,
     *   notify_url: string,
     *   items: array<int, array{item_name: string, price: float|int|string, quantity: int|string, item_sku?: ?string, item_notes?: ?string}>,
     *   external_store_id?: ?string,
     *   customer_name?: ?string,
     *   customer_email?: ?string,
     *   customer_mobile_no?: ?string,
     *   customer_address?: ?string,
     *   notes?: ?string,
     *   purchase_order?: ?string,
     *   discount?: float|int|string|null,
     *   additional_fee?: float|int|string|null,
     * }  $params
     */
    public function createPaymentLink(array $params): array
    {
        $endpoint = '/payment-link/v1.0/debit/payment-host-to-host';

        $items = array_map(fn (array $item) => array_filter([
            'itemName' => $item['item_name'],
            'itemNotes' => $item['item_notes'] ?? null,
            'itemSku' => $item['item_sku'] ?? null,
            'price' => (string) $item['price'],
            'quantity' => (string) $item['quantity'],
        ], fn ($value) => $value !== null), $params['items']);

        $additionalInfo = array_filter([
            'currency' => 'IDR',
            'customerName' => $params['customer_name'] ?? null,
            'customerEmail' => $params['customer_email'] ?? null,
            'customerMobileNo' => $params['customer_mobile_no'] ?? null,
            'customerAddress' => $params['customer_address'] ?? null,
            'notes' => $params['notes'] ?? null,
            'purchaseOrder' => $params['purchase_order'] ?? null,
            'discount' => $params['discount'] ?? null,
            'additionalFee' => $params['additional_fee'] ?? null,
            'items' => $items,
        ], fn ($value) => $value !== null);

        $body = array_filter([
            'externalStoreId' => $params['external_store_id'] ?? null,
            'partnerReferenceNo' => $params['partner_reference_no'],
            'validUpTo' => $this->validUpTo(),
            'amount' => [
                'currency' => 'IDR',
                'value' => number_format((float) $params['amount'], 2, '.', ''),
            ],
            'urlParams' => [
                [
                    'type' => 'PAY_RETURN',
                    'url' => $params['return_url'],
                    'isDeeplink' => 'N',
                ],
                [
                    'type' => 'PAY_NOTIFY',
                    'url' => $params['notify_url'],
                    'isDeeplink' => 'N',
                ],
            ],
            'additionalInfo' => $additionalInfo,
        ], fn ($value) => $value !== null);

        return $this->post($endpoint, $body);
    }

    /**
     * Cek status pembayaran berdasarkan partnerReferenceNo.
     */
    public function checkPaymentStatus(string $originalPartnerReferenceNo): array
    {
        $endpoint = '/payment-link/v1.0/debit/status';

        return $this->post($endpoint, [
            'originalPartnerReferenceNo' => $originalPartnerReferenceNo,
        ]);
    }

    /**
     * Buat pembayaran E-Wallet (Direct Debit Host to Host).
     * Beda dari createPaymentLink() — ini API khusus e-wallet, bukan hosted checkout page.
     *
     * @param  array{
     *   partner_reference_no: string,
     *   amount: float|int|string,
     *   return_url: string,
     *   notify_url: string,
     *   channel: string,           // "OVO" atau "DANA"
     *   customer_phone: string,    // wajib untuk Ewallet API
     *   customer_name?: ?string,
     *   customer_email?: ?string,
     *   point_of_initiation?: string,
     * }  $params
     */
    public function createEwalletPayment(array $params): array
    {
        $endpoint = '/api/v1.0/debit/payment-host-to-host';

        $additionalInfo = array_filter([
            'channel' => $params['channel'],
            'customerPhone' => $params['customer_phone'],
            'customerName' => $params['customer_name'] ?? null,
            'customerEmail' => $params['customer_email'] ?? null,
        ], fn ($value) => $value !== null);

        $body = [
            'partnerReferenceNo' => $params['partner_reference_no'],
            'amount' => [
                'currency' => 'IDR',
                'value' => number_format((float) $params['amount'], 2, '.', ''),
            ],
            'urlParams' => [
                [
                    'type' => 'PAY_RETURN',
                    'url' => $params['return_url'],
                    'isDeeplink' => 'N',
                ],
                [
                    'type' => 'PAY_NOTIFY',
                    'url' => $params['notify_url'],
                    'isDeeplink' => 'N',
                ],
            ],
            'validUpTo' => $this->validUpTo(),
            'pointOfInitiation' => $params['point_of_initiation'] ?? 'STATIC',
            'additionalInfo' => $additionalInfo,
        ];

        return $this->post($endpoint, $body);
    }

    /**
     * Cek status pembayaran Ewallet (beda endpoint & body dari Check Status Payment Link).
     */
    public function checkEwalletPaymentStatus(string $originalPartnerReferenceNo, string $originalReferenceNo, string $channelCode): array
    {
        $endpoint = '/api/v1.0/debit/status';

        return $this->post($endpoint, [
            'originalPartnerReferenceNo' => $originalPartnerReferenceNo,
            'additionalInfo' => [
                'originalReferenceNo' => $originalReferenceNo,
                'channelCode' => $channelCode,
            ],
        ]);
    }

    /**
     * Mapping partnerServiceId & panjang maksimal customerNo per bank channel.
     * Lihat tabel "Partner Service ID" di dokumentasi Virtual Account.
     */
    protected const VA_BANK_CHANNELS = [
        'BCA_VA'      => ['partner_service_id' => '1010001', 'max_length' => 6],
        'BNI_VA'      => ['partner_service_id' => '1020002', 'max_length' => 6],
        'CIMB_VA'     => ['partner_service_id' => '1030003', 'max_length' => 9],
        'PERMATA_VA'  => ['partner_service_id' => '1040004', 'max_length' => 8],
        'BRI_VA'      => ['partner_service_id' => '1050005', 'max_length' => 8],
        'MAYBANK_VA'  => ['partner_service_id' => '1060006', 'max_length' => 6],
        'MANDIRI_VA'  => ['partner_service_id' => '1070007', 'max_length' => 7],
        'BNC_VA'      => ['partner_service_id' => '1080008', 'max_length' => 10],
        'DANAMON_VA'  => ['partner_service_id' => '1100010', 'max_length' => 7],
        'BTN_VA'      => ['partner_service_id' => '1110011', 'max_length' => 9],
        'BSI_VA'      => ['partner_service_id' => '1120012', 'max_length' => 7],
        'SINARMAS_VA' => ['partner_service_id' => '1130013', 'max_length' => 6],
        'ALFAMART'    => ['partner_service_id' => '1140014', 'max_length' => 6],
        'INDOMARET'   => ['partner_service_id' => '1150015', 'max_length' => 6],
    ];

    public static function vaBankChannels(): array
    {
        return array_keys(self::VA_BANK_CHANNELS);
    }
    /**
     * Buat Virtual Account (Close Amount).
     *
     * @param  array{
     *   bank_channel: string,       // salah satu key di VA_BANK_CHANNELS, mis. "BCA_VA"
     *   trx_id: string,             // ID unik dari sisi kamu, mis. invoice_number
     *   amount: float|int|string,
     *   customer_name: string,      // tampil di sisi bank sebagai nama VA
     *   expired_minutes?: int,      // default 60 menit
     *   customer_no?: ?string,      // opsional; kalau kosong, Doitpay generate otomatis
     * }  $params
     */

    public function createVirtualAccount(array $params): array
    {
        $bankChannel = strtoupper($params['bank_channel']);

        if (! isset(self::VA_BANK_CHANNELS[$bankChannel])) {
            throw new Exception("Doitpay: bank channel VA tidak dikenal - {$bankChannel}");
        }

        $channel = self::VA_BANK_CHANNELS[$bankChannel];
        $endpoint = '/va/v1.0/transfer-va/create-va';

        $customerNo = $params['customer_no'] ?? null;

        if (empty($customerNo)) {
            $digitsOnly = preg_replace('/\D/', '', $params['trx_id']);
            $customerNo = str_pad(substr($digitsOnly, -$channel['max_length']), $channel['max_length'], '0', STR_PAD_LEFT);
        } else {
            $customerNo = substr($customerNo, 0, $channel['max_length']);
        }

        $expiredMinutes = $params['expired_minutes'] ?? 60;

        $body = array_filter([
            'partnerServiceId' => $channel['partner_service_id'], // tanpa padding spasi
            'customerNo' => $customerNo,
            'virtualAccountNo' => '',
            'virtualAccountName' => $params['customer_name'],
            'virtualAccountEmail' => $params['customer_email'] ?? null,
            'virtualAccountPhone' => $params['customer_phone'] ?? null,
            'trxId' => $params['trx_id'],
            'totalAmount' => [
                'value' => number_format((float) $params['amount'], 2, '.', ''),
                'currency' => 'IDR',
            ],
            'virtualAccountTrxType' => 'C',
            'expiredDate' => $this->validUpTo($expiredMinutes),
            'additionalInfo' => [
                'minAmount' => '0.00',
                'maxAmount' => '0.00',
            ],
        ], fn ($value) => $value !== null);

        return $this->post($endpoint, $body);
    }

    /**
     * Cek status pembayaran Virtual Account.
     */
    public function checkVirtualAccountStatus(string $bankChannel, string $customerNo, string $virtualAccountNo, string $trxId): array
    {
        $bankChannel = strtoupper($bankChannel);

        if (! isset(self::VA_BANK_CHANNELS[$bankChannel])) {
            throw new Exception("Doitpay: bank channel VA tidak dikenal - {$bankChannel}");
        }

        $endpoint = '/va/v1.0/transfer-va/status';

        return $this->post($endpoint, [
            'partnerServiceId' => self::VA_BANK_CHANNELS[$bankChannel]['partner_service_id'], // tanpa padding spasi
            'customerNo' => $customerNo,
            'virtualAccountNo' => $virtualAccountNo,
            'inquiryRequestId' => $trxId,
        ]);
    }

    public function deleteVirtualAccount(string $bankChannel, string $customerNo, string $virtualAccountNo, string $trxId): array
    {
        $bankChannel = strtoupper($bankChannel);
    
        if (! isset(self::VA_BANK_CHANNELS[$bankChannel])) {
            throw new Exception("Doitpay: bank channel VA tidak dikenal - {$bankChannel}");
        }
    
        $endpoint = '/va/v1.0/transfer-va/delete-va';
    
        return $this->post($endpoint, [
            'partnerServiceId' => self::VA_BANK_CHANNELS[$bankChannel]['partner_service_id'], // tanpa padding spasi
            'customerNo' => $customerNo,
            'virtualAccountNo' => $virtualAccountNo,
            'trxId' => $trxId,
        ]);
    }

    /**
     * Generate QR code untuk pembayaran QRIS (Merchant Presented Mode).
     * PENTING: CHANNEL-ID untuk QRIS adalah "NQ", bukan "DOITPAY".
     * PENTING: validityPeriod minimal 30 menit (ketentuan Doitpay).
     *
     * @param  array{
     *   partner_reference_no: string,
     *   amount: float|int|string,
     *   valid_minutes?: int,   // minimal 30, default 30
     *   device_id?: ?string,
     * }  $params
     */
    public function createQrisPayment(array $params): array
    {
        $endpoint = '/qris/v1.0/qr/qr-mpm-generate';

        $validMinutes = max(30, $params['valid_minutes'] ?? 30);

        $body = [
            'partnerReferenceNo' => $params['partner_reference_no'],
            'validityPeriod' => $this->validUpTo($validMinutes),
            'amount' => [
                'currency' => 'IDR',
                'value' => number_format((float) $params['amount'], 2, '.', ''),
            ],
        ];

        return $this->post($endpoint, $body, channelId: 'NQ');
    }

    /**
     * Cek status pembayaran QRIS.
     */
    public function checkQrisStatus(string $originalPartnerReferenceNo, string $originalReferenceNo): array
    {
        $endpoint = '/qris/v1.0/qr/qr-mpm-query';

        return $this->post($endpoint, [
            'originalPartnerReferenceNo' => $originalPartnerReferenceNo,
            'originalReferenceNo' => $originalReferenceNo,
            'serviceCode' => '47',
        ], channelId: 'NQ');
    }

    /**
     * Buat pembayaran Credit Card. Endpoint & struktur identik dengan Ewallet,
     * cuma beda channel ("CC"). Callback juga pakai URL fixed yang sama:
     * https://yourdomain.com/v1.0/debit/notify
     *
     * @param  array{
     *   partner_reference_no: string,
     *   amount: float|int|string,
     *   return_url: string,
     *   notify_url: string,
     *   customer_phone: string,
     *   customer_name?: ?string,
     *   customer_email?: ?string,
     * }  $params
     */
    public function createCreditCardPayment(array $params): array
    {
        return $this->createEwalletPayment(array_merge($params, [
            'channel' => 'CC',
        ]));
    }

    /**
     * Cek status pembayaran Credit Card — struktur identik checkEwalletPaymentStatus().
     */
    public function checkCreditCardStatus(string $originalPartnerReferenceNo, string $originalReferenceNo): array
    {
        return $this->checkEwalletPaymentStatus($originalPartnerReferenceNo, $originalReferenceNo, 'CC');
    }

    /**
     * Kirim POST request bertanda tangan (symmetric) ke Doitpay,
     * dengan retry sekali jika access token ternyata sudah invalid.
     */
    protected function post(string $endpoint, array $body, bool $isRetry = false, string $channelId = 'DOITPAY'): array
    {
        $accessToken = $this->getAccessToken();

        $rawJsonBody = json_encode(
            $body,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
        );

        $timestamp = $this->timestamp();

        $signature = $this->symmetricSignature(
            'POST',
            $endpoint,
            $accessToken,
            $rawJsonBody,
            $timestamp
        );

        $externalId = (string) Str::uuid();

        $headers = [
            'Content-Type: application/json',
            "X-TIMESTAMP: {$timestamp}",
            "X-SIGNATURE: {$signature}",
            "X-PARTNER-ID: {$this->merchantRef}",
            "X-EXTERNAL-ID: {$externalId}",
            "CHANNEL-ID: {$channelId}",
            "Authorization: Bearer {$accessToken}",
        ];

        Log::info('DOITPAY REQUEST', [
            'endpoint' => $endpoint,
            'rawJsonBody' => $rawJsonBody,
            'headers' => $headers,
        ]);

        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => "{$this->baseUrl}{$endpoint}",
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS => $rawJsonBody,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_HEADER => true,
            CURLOPT_CONNECTTIMEOUT => 30,
            CURLOPT_TIMEOUT => 60,
            // Tidak ada paksaan HTTP_VERSION, SSLVERSION, CIPHER_LIST, User-Agent, dsb.
            // Biarkan curl negosiasi ALPN h2 secara natural, sama seperti test yang berhasil.
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            curl_close($ch);
            throw new Exception("Curl Error: {$error}");
        }

        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $responseBody = substr($response, $headerSize);
        curl_close($ch);

        Log::info('DOITPAY RESPONSE', [
            'status' => $status,
            'body' => $responseBody,
        ]);

        if (! $isRetry && $status === 401) {
            $this->getAccessToken(forceRefresh: true);
            return $this->post($endpoint, $body, true, $channelId); // <-- teruskan $channelId juga di retry
        }

        if ($status < 200 || $status >= 300) {
            throw new Exception(sprintf(
                'Doitpay request failed. HTTP %s Body: %s',
                $status,
                $responseBody
            ));
        }

        $json = json_decode($responseBody, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Invalid JSON Response: '.$responseBody);
        }

        return $json;
    }

    /**
     * Verifikasi signature pada callback/notifikasi pembayaran dari Doitpay.
     * secretKey pada notifikasi = Merchant Reference (bukan client key).
     */
    public function verifyNotificationSignature(string $method, string $endpoint, string $rawRequestBody, string $timestamp, string $receivedSignature): bool
    {
        $stringToSign = $method.':'.$endpoint.':'.$this->merchantRef.':'.$this->bodyHash($rawRequestBody).':'.$timestamp;

        $hash = hash_hmac('sha512', $stringToSign, $this->merchantRef, true);
        $expectedSignature = base64_encode($hash);

        return hash_equals($expectedSignature, $receivedSignature);
    }

    // public function verifyDirectInquirySignature(string $method, string $endpoint, string $rawRequestBody, string $timestamp, string $receivedSignature): bool
    // {
    //     $secretKey = config('doitpay.direct_inquiry_secret');

    //     $stringToSign = $method.':'.$endpoint.':'.$this->merchantRef.':'.$this->bodyHash($rawRequestBody).':'.$timestamp;

    //     $hash = hash_hmac('sha512', $stringToSign, $secretKey, true);
    //     $expectedSignature = base64_encode($hash);

    //     return hash_equals($expectedSignature, $receivedSignature);
    // }
}