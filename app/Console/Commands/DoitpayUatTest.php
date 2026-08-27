<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/**
 * php artisan doitpay:uat
 * php artisan doitpay:uat --only=11.1,11.3,11.5
 *
 * Menjalankan skenario UAT Virtual Account Doitpay memakai kredensial asli
 * dari config('doitpay.*') (SAMA seperti yang dipakai DoitpayService).
 * Setiap skenario mencetak request mentah & response mentah ke console,
 * DAN menuliskannya ke storage/app/doitpay-uat-result.json supaya bisa
 * langsung dipakai mengisi form UAT / dikirim balik untuk dirapikan.
 *
 * PENTING: jalankan di environment SANDBOX Doitpay, bukan production,
 * karena beberapa skenario sengaja mengirim data yang salah/rusak.
 */
class DoitpayUatTest extends Command
{
    protected $signature = 'doitpay:uat
        {--only= : Nomor skenario dipisah koma, mis. 11.1,11.3}
        {--trx-id= : trxId/invoice_number transaksi ASLI yang sudah ada di DB (untuk skenario 11.25)}
        {--va-no= : virtualAccountNo transaksi tsb (untuk skenario 11.25)}
        {--customer-no= : customerNo transaksi tsb (untuk skenario 11.25)}
        {--partner-service-id=1020002 : partnerServiceId transaksi tsb (untuk skenario 11.25)}
        {--amount= : totalAmount asli transaksi tsb, dipakai hitung paidAmount mismatch (untuk skenario 11.25)}';
    protected $description = 'Jalankan skenario UAT Virtual Account Doitpay secara nyata dan catat request/response-nya';

    protected string $baseUrl;
    protected string $clientKey;
    protected string $merchantRef;
    protected string $privateKey;
    protected array $results = [];

    public function handle(): int
    {
        $this->baseUrl     = rtrim((string) config('doitpay.base_url'), '/');
        $this->clientKey   = (string) config('doitpay.client_key');
        $this->merchantRef = (string) config('doitpay.merchant_ref');
        $this->privateKey  = file_get_contents((string) config('doitpay.private_key_path'));

        $only = $this->option('only') ? array_map('trim', explode(',', $this->option('only'))) : null;

        $scenarios = [
            '11.1' => 'scenarioAccessTokenInvalid',
            '11.2' => 'scenarioUnauthorizedSignature',
            '11.3' => 'scenarioMissingMandatoryField',
            '11.4' => 'scenarioInvalidFieldFormat',
            '11.5' => 'scenarioDuplicateExternalId',
            '11.13' => 'scenarioCheckStatus',
            '11.14' => 'scenarioCreateVa',
            '11.18' => 'scenarioDeleteVa',
            '11.10' => 'scenarioPaymentValidVa',
            '11.11' => 'scenarioPaymentUnregisteredVa',
            '11.25' => 'scenarioPaymentInvalidAmount',
        ];

        foreach ($scenarios as $no => $method) {
            if ($only && ! in_array($no, $only, true)) {
                continue;
            }

            $this->info("=== Menjalankan skenario {$no} ===");

            try {
                $this->{$method}($no);
            } catch (\Throwable $e) {
                $this->error("Skenario {$no} melempar exception: {$e->getMessage()}");
                $this->record($no, 'EXCEPTION', null, null, ['error' => $e->getMessage()]);
            }

            $this->newLine();
        }

        $path = storage_path('app/doitpay-uat-result.json');
        file_put_contents($path, json_encode($this->results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        $this->info("Selesai. Hasil lengkap tersimpan di: {$path}");

        return self::SUCCESS;
    }

    // ---------- helpers (meniru persis logic DoitpayService) ----------

    protected function jakartaNow(): \DateTimeImmutable
    {
        return new \DateTimeImmutable('now', new \DateTimeZone('Asia/Jakarta'));
    }

    protected function timestamp(): string
    {
        return $this->jakartaNow()->format('Y-m-d\TH:i:sP');
    }

    protected function bodyHash(string $rawJsonBody): string
    {
        return strtolower(hash('sha256', $rawJsonBody));
    }

    protected function asymmetricSignature(string $timestamp): string
    {
        $stringToSign = $this->clientKey.'|'.$timestamp;
        $priv = openssl_pkey_get_private($this->privateKey);
        openssl_sign($stringToSign, $binary, $priv, OPENSSL_ALGO_SHA256);
        return base64_encode($binary);
    }

    protected function symmetricSignature(string $method, string $endpoint, string $accessToken, string $rawJsonBody, string $timestamp): string
    {
        $stringToSign = $method.':'.$endpoint.':'.$accessToken.':'.$this->bodyHash($rawJsonBody).':'.$timestamp;
        return base64_encode(hash_hmac('sha512', $stringToSign, $this->clientKey, true));
    }

    /**
     * Signature khusus untuk Payment VA (callback) — beda formula dari symmetricSignature() biasa.
     * Sesuai docs resmi (docs.doitpay.co/transactions/virtual-account) bagian
     * "Symmetric Signature Payment Notification":
     *
     *   stringToSign = HttpMethod + ":" + Endpoint + ":" + MerchantRef + ":" +
     *                   LowerCase(HexEncode(SHA-256(Minify(RequestBody)))) + ":" + Timestamp
     *   hash = HMAC_SHA512(stringToSign, secretKey)
     *   signature = Base64(hash)
     *
     * Dokumentasi eksplisit menyebut: "secretKey adalah Merchant Reference."
     * Jadi BEDA dari symmetricSignature() biasa (yang secretKey-nya Client Key) —
     * di sini secretKey DAN MerchantRef di dalam stringToSign SAMA-SAMA memakai
     * nilai Merchant Reference (X-PARTNER-ID).
     */
    protected function paymentNotificationSignature(string $method, string $endpoint, string $rawJsonBody, string $timestamp): string
    {
        $stringToSign = $method.':'.$endpoint.':'.$this->merchantRef.':'.$this->bodyHash($rawJsonBody).':'.$timestamp;

        return base64_encode(hash_hmac('sha512', $stringToSign, $this->merchantRef, true));
    }

    protected function getAccessToken(): string
    {
        $timestamp = $this->timestamp();
        $signature = $this->asymmetricSignature($timestamp);

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-TIMESTAMP' => $timestamp,
            'X-SIGNATURE' => $signature,
            'X-CLIENT-KEY' => $this->clientKey,
        ])->post("{$this->baseUrl}/auth/v1.0/access-token/b2b", ['grantType' => 'client_credentials']);

        if (! $response->successful() || empty($response->json('accessToken'))) {
            throw new \Exception('Gagal ambil access token: '.$response->body());
        }

        return $response->json('accessToken');
    }

    /**
     * Kirim raw request ke API Doitpay (arah: Merchant -> Doitpay) dan catat request/response mentahnya.
     */
    protected function send(string $no, string $method, string $endpoint, array $body, ?string $accessTokenOverride = null, ?string $signatureOverride = null, ?string $externalIdOverride = null, array $extraHeaders = []): array
    {
        $accessToken = $accessTokenOverride ?? $this->getAccessToken();
        $rawJsonBody = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $timestamp = $this->timestamp();
        $signature = $signatureOverride ?? $this->symmetricSignature($method, $endpoint, $accessToken, $rawJsonBody, $timestamp);
        $externalId = $externalIdOverride ?? (string) Str::uuid();

        $headers = array_merge([
            'Content-Type' => 'application/json',
            'X-TIMESTAMP' => $timestamp,
            'X-SIGNATURE' => $signature,
            'X-PARTNER-ID' => $this->merchantRef,
            'X-EXTERNAL-ID' => $externalId,
            'CHANNEL-ID' => 'DOITPAY',
            'Authorization' => "Bearer {$accessToken}",
        ], $extraHeaders);

        $requestDump = [
            'method' => $method,
            'endpoint' => $endpoint,
            'headers' => $headers,
            'body' => $body,
        ];

        $this->line("REQUEST:\n".json_encode($requestDump, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        $http = Http::withHeaders($headers);
        $response = $method === 'DELETE'
            ? $http->send('DELETE', "{$this->baseUrl}{$endpoint}", ['body' => $rawJsonBody])
            : $http->post("{$this->baseUrl}{$endpoint}", $body);

        $responseDump = [
            'status' => $response->status(),
            'body' => $response->json() ?? $response->body(),
        ];

        $this->line("RESPONSE:\n".json_encode($responseDump, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        $this->record($no, $method.' '.$endpoint, $requestDump, $responseDump);

        return $responseDump;
    }

    /**
     * Kirim notifikasi Payment VA (arah: simulasi Doitpay -> webhook Anda) ke URL callback penuh
     * memakai skema signature khusus notifikasi (paymentNotificationSignature).
     *
     * $callbackUrl HARUS full URL webhook Anda sendiri, mis:
     *   config('doitpay.callback_url')  atau  url('/api/doitpay/payment-callback')
     * Sesuaikan dengan route yang benar-benar Anda daftarkan untuk menerima notifikasi Doitpay.
     */
    protected function sendPaymentCallback(string $no, string $callbackUrl, string $relativeEndpoint, array $body): array
    {
        $rawJsonBody = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $timestamp = $this->timestamp();
        $signature = $this->paymentNotificationSignature('POST', $relativeEndpoint, $rawJsonBody, $timestamp);
        $externalId = (string) Str::uuid();

        $headers = [
            'Content-Type' => 'application/json',
            'X-TIMESTAMP' => $timestamp,
            'X-SIGNATURE' => $signature,
            'X-PARTNER-ID' => $this->merchantRef,
            'X-EXTERNAL-ID' => $externalId,
            'CHANNEL-ID' => 'DOITPAY',
        ];

        $requestDump = [
            'method' => 'POST',
            'url' => $callbackUrl,
            'headers' => $headers,
            'body' => $body,
        ];

        $this->line("CALLBACK REQUEST:\n".json_encode($requestDump, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        // PENTING: kirim $rawJsonBody APA ADANYA (bukan array $body via ->post($url,$body)),
        // supaya bytes yang benar-benar diterima controller Anda PERSIS SAMA dengan bytes
        // yang dipakai untuk menghitung signature di atas. Kalau Guzzle meng-encode ulang
        // array $body secara independen, hasilnya bisa beda byte (escaping, dsb) dari
        // $rawJsonBody yang sudah kita hash duluan -> signature jadi tidak cocok.
        $response = Http::withHeaders($headers)
            ->withBody($rawJsonBody, 'application/json')
            ->post($callbackUrl);

        $responseDump = [
            'status' => $response->status(),
            'body' => $response->json() ?? $response->body(),
        ];

        $this->line("CALLBACK RESPONSE:\n".json_encode($responseDump, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

        $this->record($no, 'POST (callback) '.$relativeEndpoint, $requestDump, $responseDump);

        return $responseDump;
    }

    protected function record(string $no, string $label, ?array $request, ?array $response, array $extra = []): void
    {
        $this->results[$no] = array_merge([
            'label' => $label,
            'request' => $request,
            'response' => $response,
        ], $extra);
    }

    protected function sampleVaBody(string $trxSuffix = ''): array
    {
        $trxId = 'UATTEST'.now()->format('YmdHis').$trxSuffix;

        return [
            'partnerServiceId' => '1020002', // MANDIRI_VA — ganti sesuai channel yang mau diuji
            'customerNo' => substr(preg_replace('/\D/', '', $trxId), -7),
            'virtualAccountNo' => '',
            'virtualAccountName' => 'Fauzan Test User',
            'virtualAccountEmail' => 'hialdialfianto@gmail.com',
            'virtualAccountPhone' => '081200000000',
            'trxId' => $trxId,
            'totalAmount' => ['value' => '100000.00', 'currency' => 'IDR'],
            'virtualAccountTrxType' => 'C',
            'expiredDate' => $this->jakartaNow()->modify('+60 minutes')->format('Y-m-d\TH:i:sP'),
            'additionalInfo' => ['minAmount' => '0.00', 'maxAmount' => '0.00'],
        ];
    }

    // ---------- skenario ----------

    protected function scenarioAccessTokenInvalid(string $no): void
    {
        // Signature dihitung memakai token palsu ini juga (server yang akan menolak tokennya).
        $this->send($no, 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A1'),
            accessTokenOverride: 'token_sengaja_tidak_valid_'.Str::random(20));
    }

    protected function scenarioUnauthorizedSignature(string $no): void
    {
        $accessToken = $this->getAccessToken();
        $body = $this->sampleVaBody('A2');
        $rawJsonBody = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $timestamp = $this->timestamp();
        $validSignature = $this->symmetricSignature('POST', '/va/v1.0/transfer-va/create-va', $accessToken, $rawJsonBody, $timestamp);

        // Rusak signature yang valid (ubah 1 karakter terakhir)
        $brokenSignature = substr($validSignature, 0, -1).(substr($validSignature, -1) === 'A' ? 'B' : 'A');

        $this->send($no, 'POST', '/va/v1.0/transfer-va/create-va', $body,
            accessTokenOverride: $accessToken, signatureOverride: $brokenSignature);
    }

    protected function scenarioMissingMandatoryField(string $no): void
    {
        $body = $this->sampleVaBody('A3');
        unset($body['customerNo']); // hilangkan field wajib SEBELUM signature dihitung

        $this->send($no, 'POST', '/va/v1.0/transfer-va/create-va', $body);
    }

    protected function scenarioInvalidFieldFormat(string $no): void
    {
        $body = $this->sampleVaBody('A4');
        $body['expiredDate'] = '24-08-2026'; // format salah, BUKAN ISO-8601 — signature dihitung dari body ini juga

        $this->send($no, 'POST', '/va/v1.0/transfer-va/create-va', $body);
    }

    protected function scenarioDuplicateExternalId(string $no): void
    {
        $externalId = (string) Str::uuid();

        $first = $this->send($no.'-first', 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A5a'),
            externalIdOverride: $externalId);

        $second = $this->send($no.'-second', 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A5b'),
            externalIdOverride: $externalId);

        $this->record($no, 'Duplicate X-EXTERNAL-ID', null, null, ['first' => $first, 'second' => $second]);
    }

    protected function scenarioCreateVa(string $no): void
    {
        $this->send($no, 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A14'));
    }

    protected function scenarioCheckStatus(string $no): void
    {
        $this->warn('Skenario 11.13 butuh VA yang SUDAH dibayar. Edit method scenarioCheckStatus() di command ini,');
        $this->warn('isi partnerServiceId/customerNo/virtualAccountNo/trxId dari VA yang sudah lunas via simulator.');

        // Contoh — ganti dengan data VA nyata yang sudah dibayar:
        $this->send($no, 'POST', '/va/v1.0/transfer-va/status', [
            'partnerServiceId' => '1020002',
            'customerNo' => '082426',
            'virtualAccountNo' => '1020002855308082426',
            'inquiryRequestId' => 'AUN0002082426C',
        ]);
    }

    protected function scenarioDeleteVa(string $no): void
    {
        // Buat VA baru dulu supaya ada yang bisa dihapus (status masih active).
        $va = $this->send($no.'-create-dulu', 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A18'));
        $data = $va['body']['virtualAccountData'] ?? null;

        if (! $data) {
            $this->error('Gagal membuat VA untuk diuji delete-nya, lihat response di atas.');
            return;
        }

        $this->send($no, 'DELETE', '/va/v1.0/transfer-va/delete-va', [
            'partnerServiceId' => $data['partnerServiceId'],
            'customerNo' => $data['customerNo'],
            'virtualAccountNo' => $data['virtualAccountNo'],
            'trxId' => $data['trxId'],
        ]);
    }

    /**
     * Bangun body notifikasi Payment VA dari data transaksi ASLI yang Anda berikan lewat
     * opsi CLI (--trx-id --va-no --customer-no --amount --partner-service-id).
     * Return null (dan cetak error) kalau opsi wajib belum diisi.
     */
    protected function samplePaymentCallbackBody(): ?array
    {
        $trxId = $this->option('trx-id');
        $vaNo = $this->option('va-no');
        $customerNo = $this->option('customer-no');
        $partnerServiceId = $this->option('partner-service-id');
        $amount = $this->option('amount');

        if (! $trxId || ! $vaNo || ! $customerNo || ! $amount) {
            $this->error('Skenario ini butuh data transaksi ASLI dari DB Anda. Contoh:');
            $this->error('php artisan doitpay:uat --only=11.10 --trx-id=<invoice_number> --va-no=<virtualAccountNo> --customer-no=<customerNo> --amount=<totalAmount, mis. 500000.00>');
            return null;
        }

        return [
            'partnerServiceId' => $partnerServiceId,
            'customerNo' => $customerNo,
            'virtualAccountNo' => $vaNo,
            'paymentRequestId' => (string) Str::uuid(),
            'trxId' => $trxId,
            'paidAmount' => ['value' => number_format((float) $amount, 2, '.', ''), 'currency' => 'IDR'],
            'additionalInfo' => ['reference' => '', 'paymentCode' => ''],
        ];
    }

    /**
     * Skenario 11.10 — Input No Virtual Account VALID (terdaftar di DB Anda).
     * paidAmount TIDAK diinput manual (--amount) — melainkan diambil otomatis dari
     * Doitpay via Check Status API, supaya PASTI exact match dengan totalAmount asli
     * (hindari mismatch gara-gara typo/format beda, mis. "500000" vs "500000.00").
     * Ekspektasi: response sukses (200 / 2002500), status transaksi di DB jadi success.
     */
    protected function scenarioPaymentValidVa(string $no): void
    {
        $trxId = $this->option('trx-id');
        $vaNo = $this->option('va-no');
        $customerNo = $this->option('customer-no');
        $partnerServiceId = $this->option('partner-service-id');

        if (! $trxId || ! $vaNo || ! $customerNo) {
            $this->error('Skenario ini butuh data transaksi ASLI dari DB Anda. Contoh:');
            $this->error('php artisan doitpay:uat --only=11.10 --trx-id=<invoice_number> --va-no=<virtualAccountNo> --customer-no=<customerNo>');
            return;
        }

        // Ambil totalAmount asli langsung dari Doitpay, bukan input manual.
        $statusResponse = $this->send($no.'-check-status', 'POST', '/va/v1.0/transfer-va/status', [
            'partnerServiceId' => $partnerServiceId,
            'customerNo' => $customerNo,
            'virtualAccountNo' => $vaNo,
            'inquiryRequestId' => $trxId,
        ]);

        $totalAmountValue = $statusResponse['body']['virtualAccountData']['totalAmount']['value'] ?? null;

        if (! $totalAmountValue) {
            $this->error('Gagal ambil totalAmount asli dari Doitpay (Check Status). Lihat response di atas — pastikan trx-id/va-no/customer-no benar dan VA ini masih ada di Doitpay.');
            return;
        }

        $body = [
            'partnerServiceId' => $partnerServiceId,
            'customerNo' => $customerNo,
            'virtualAccountNo' => $vaNo,
            'paymentRequestId' => (string) Str::uuid(),
            'trxId' => $trxId,
            'paidAmount' => ['value' => $totalAmountValue, 'currency' => 'IDR'],
            'additionalInfo' => ['reference' => '', 'paymentCode' => ''],
        ];

        $relativeEndpoint = '/v1.0/transfer-va/payment';
        $callbackUrl = config('doitpay.callback_url', 'https://confess-yard-cocoa.ngrok-free.dev'.$relativeEndpoint);

        $this->info("paidAmount diambil otomatis dari Check Status: {$totalAmountValue} -> expect 200 success.");
        $this->sendPaymentCallback($no, $callbackUrl, $relativeEndpoint, $body);
    }

    /**
     * Skenario 11.11 — Input No Virtual Account TIDAK TERDAFTAR.
     * virtualAccountNo & trxId dibuat FIKTIF (tidak pernah ada di sistem Anda sama sekali)
     * -> ekspektasi: response ditolak, mis. 404 "Transaction Not Found".
     *
     * CATATAN: controller Anda saat ini HANYA mencari transaksi berdasarkan `trxId`
     * (Transaction::where('invoice_number', ...)), TIDAK memvalidasi apakah
     * `virtualAccountNo` yang dikirim benar-benar cocok dengan VA milik transaksi itu.
     * Kalau Anda ingin menguji "VA number" secara terisolasi (trxId asli tapi VA number
     * dipalsukan), jalankan manual dengan --trx-id asli tapi --va-no dipalsukan, lalu cek
     * apakah controller Anda tetap menerimanya (kemungkinan besar YA, karena tidak dicek) —
     * ini bisa jadi temuan tambahan yang perlu diperbaiki juga.
     */
    protected function scenarioPaymentUnregisteredVa(string $no): void
    {
        $fakeTrxId = 'UATTEST-NOTFOUND-'.now()->format('YmdHis').'-'.Str::random(4);
        $fakePartnerServiceId = $this->option('partner-service-id');
        $fakeCustomerNo = substr(preg_replace('/\D/', '', $fakeTrxId), -7);
        $fakeVaNo = $fakePartnerServiceId.str_pad((string) random_int(1, 999999999999), 12, '0', STR_PAD_LEFT);

        $body = [
            'partnerServiceId' => $fakePartnerServiceId,
            'customerNo' => $fakeCustomerNo,
            'virtualAccountNo' => $fakeVaNo,
            'paymentRequestId' => (string) Str::uuid(),
            'trxId' => $fakeTrxId,
            'paidAmount' => ['value' => '100000.00', 'currency' => 'IDR'],
            'additionalInfo' => ['reference' => '', 'paymentCode' => ''],
        ];

        $relativeEndpoint = '/v1.0/transfer-va/payment';
        $callbackUrl = config('doitpay.callback_url', 'https://confess-yard-cocoa.ngrok-free.dev'.$relativeEndpoint);

        $this->info("virtualAccountNo TIDAK TERDAFTAR ({$fakeVaNo}), trxId fiktif ({$fakeTrxId}) -> expect ditolak (404).");
        $this->sendPaymentCallback($no, $callbackUrl, $relativeEndpoint, $body);
    }

    /**
     * Skenario 11.25 — Payment VA (callback) dengan paidAmount YANG SENGAJA TIDAK COCOK
     * dengan totalAmount VA (Close Amount harus exact match).
     *
     * Alur:
     * 1. Create VA dulu supaya dapat virtualAccountNo/trxId/totalAmount yang valid & asli.
     * 2. Kirim notifikasi payment ke webhook callback ANDA SENDIRI dengan paidAmount
     *    yang lebih kecil dari totalAmount, memakai signature khusus notifikasi.
     *
     * PENTING — sesuaikan dulu sebelum jalan:
     * - $callbackUrl di bawah HARUS diganti ke URL webhook Anda yang sebenarnya
     *   (mis. config('doitpay.callback_url') atau url('/api/doitpay/payment-callback')).
     * - $relativeEndpoint HARUS sama persis dengan path relative yang dipakai controller
     *   Anda saat validasi signature (tanpa host), karena dipakai di formula stringToSign.
     */
    protected function scenarioPaymentInvalidAmount(string $no): void
    {
        $trxId = $this->option('trx-id');

        if ($trxId) {
            // --- Pakai transaksi ASLI yang sudah ada di DB Anda ---
            $vaData = [
                'partnerServiceId' => $this->option('partner-service-id'),
                'customerNo' => $this->option('customer-no'),
                'virtualAccountNo' => $this->option('va-no'),
                'trxId' => $trxId,
                'totalAmount' => ['value' => $this->option('amount')],
            ];

            foreach (['customerNo' => 'customer-no', 'virtualAccountNo' => 'va-no', 'totalAmount.value' => 'amount'] as $field => $opt) {
                $value = $field === 'totalAmount.value' ? $vaData['totalAmount']['value'] : $vaData[$field];
                if (empty($value)) {
                    $this->error("Opsi --{$opt} wajib diisi kalau pakai --trx-id. Contoh:");
                    $this->error('php artisan doitpay:uat --only=11.25 --trx-id=INV-001 --va-no=1020002xxxxxxx --customer-no=xxxxxxx --amount=100000.00');
                    return;
                }
            }
        } else {
            // --- Fallback: create VA baru via API (HANYA cocok untuk uji signature/format, ---
            // --- BUKAN untuk uji "Transaction Not Found" karena trxId ini tidak ada di DB Anda) ---
            $this->warn('Tidak ada --trx-id, membuat VA baru via API (trxId ini TIDAK akan ditemukan di DB Anda,');
            $this->warn('jadi response yang diharapkan adalah 404 "Transaction Not Found", bukan sukses).');
            $this->warn('Kalau mau uji end-to-end (sampai status transaksi ter-update), jalankan ulang dengan:');
            $this->warn('  --trx-id=<invoice_number asli> --va-no=<va asli> --customer-no=<customerNo asli> --amount=<totalAmount asli>');

            $vaResponse = $this->send($no.'-create-dulu', 'POST', '/va/v1.0/transfer-va/create-va', $this->sampleVaBody('A25'));
            $vaData = $vaResponse['body']['virtualAccountData'] ?? null;

            if (! $vaData) {
                $this->error('Gagal membuat VA untuk diuji payment mismatch-nya, lihat response di atas.');
                return;
            }
        }

        $totalAmountValue = (float) $vaData['totalAmount']['value'];
        $wrongPaidAmount = number_format($totalAmountValue - 1000, 2, '.', ''); // sengaja beda dari totalAmount

        // Sesuai webhook VA terdaftar: https://.../v1.0/transfer-va/payment
        // PENTING: Endpoint HARUS pakai leading slash, konsisten dengan pola endpoint lain di script ini.
        $relativeEndpoint = '/v1.0/transfer-va/payment';
        $callbackUrl = config('doitpay.callback_url', 'https://confess-yard-cocoa.ngrok-free.dev'.$relativeEndpoint);

        $body = [
            'partnerServiceId' => $vaData['partnerServiceId'],
            'customerNo' => $vaData['customerNo'],
            'virtualAccountNo' => $vaData['virtualAccountNo'],
            'paymentRequestId' => (string) Str::uuid(),
            'trxId' => $vaData['trxId'],
            'paidAmount' => ['value' => $wrongPaidAmount, 'currency' => 'IDR'],
            'additionalInfo' => ['reference' => '', 'paymentCode' => ''],
        ];

        $this->info("trxId dipakai: {$vaData['trxId']} | totalAmount asli: {$vaData['totalAmount']['value']} | paidAmount yang dikirim (mismatch): {$wrongPaidAmount}");

        $this->sendPaymentCallback($no, $callbackUrl, $relativeEndpoint, $body);
    }
}