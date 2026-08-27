<?php

namespace App\Http\Traits;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Exception;

trait HandlesDoitpayPayment
{
    protected const VA_BANKS_DISPLAY = [
        'BCA_VA'      => ['label' => 'BCA', 'logo' => '/images/icon-paymentbank/bank-bca.png'],
        'BNI_VA'      => ['label' => 'BNI', 'logo' => '/images/icon-paymentbank/bank-bni.png'],
        'BRI_VA'      => ['label' => 'BRI', 'logo' => '/images/icon-paymentbank/bank-bri.png'],
        'MANDIRI_VA'  => ['label' => 'Mandiri', 'logo' => '/images/icon-paymentbank/bank-mandiri.png'],
        'CIMB_VA'     => ['label' => 'CIMB Niaga', 'logo' => '/images/icon-paymentbank/bank-cimb.png'],
        'PERMATA_VA'  => ['label' => 'Permata', 'logo' => '/images/icon-paymentbank/bank-permata.png'],
        'BSI_VA'      => ['label' => 'BSI', 'logo' => '/images/icon-paymentbank/bank-bsi.png'],
        'DANAMON_VA'  => ['label' => 'Danamon', 'logo' => '/images/icon-paymentbank/bank-danamon.png'],
        'BTN_VA'      => ['label' => 'BTN', 'logo' => '/images/icon-paymentbank/bank-btn.png'],
        'MAYBANK_VA'  => ['label' => 'Maybank', 'logo' => '/images/icon-paymentbank/bank-maybank.png'],
        'SINARMAS_VA' => ['label' => 'Sinarmas', 'logo' => '/images/icon-paymentbank/bank-sinarmas.png'],
        'BNC_VA'      => ['label' => 'Bank Neo Commerce', 'logo' => '/images/icon-paymentbank/bnc.png'],
        'ALFAMART'    => ['label' => 'Alfamart', 'logo' => '/images/icon-paymentbank/alfamart.png'],
        'INDOMARET'   => ['label' => 'Indomaret', 'logo' => '/images/icon-paymentbank/indomaret.png'],
    ];

    protected const EWALLET_DISPLAY = [
        'DANA' => ['label' => 'DANA', 'logo' => '/images/icon-paymentbank/dana-e-wallet.png'],
        'OVO'  => ['label' => 'OVO', 'logo' => '/images/icon-paymentbank/ovo-e-wallet.png'],
    ];

    protected function paymentMethodOptions(): array
    {
        return [
            'bank' => [
                'label' => 'Bank Transfer (Virtual Account)',
                'type' => 'va',
                'providers' => collect(self::VA_BANKS_DISPLAY)
                    ->map(fn ($bank, $channel) => [
                        'channel' => $channel,
                        'name' => $bank['label'],
                        'logo' => $bank['logo'],
                    ])
                    ->values()
                    ->all(),
            ],
            'wallet' => [
                'label' => 'E-Wallet',
                'type' => 'ewallet',
                'providers' => collect(self::EWALLET_DISPLAY)
                    ->map(fn ($wallet, $channel) => [
                        'channel' => $channel,
                        'name' => $wallet['label'],
                        'logo' => $wallet['logo'],
                    ])
                    ->values()
                    ->all(),
            ],
            'qris' => [
                'label' => 'QRIS',
                'type' => 'qris',
                'providers' => [],
            ],
            'card' => [
                'label' => 'Card',
                'type' => 'credit_card',
                'providers' => [],
            ],
        ];
    }

    protected function mapPaymentMethodLabel(string $paymentType): ?string
    {
        return match ($paymentType) {
            'va' => 'Virtual Account',
            'ewallet' => 'E-Wallet',
            'qris' => 'QRIS',
            'credit_card' => 'Credit Card',
            default => null, // payment_link: metode baru diketahui setelah user pilih di halaman Doitpay
        };
    }

    protected function resolvePaymentChannel(string $paymentType, ?string $paymentChannel): ?string
    {
        return match ($paymentType) {
            'va', 'ewallet' => $paymentChannel ? strtoupper($paymentChannel) : null,
            default => null, // qris & credit_card tidak punya sub-channel pilihan user
        };
    }

    protected function validatePaymentSelection(?string $paymentType, ?string $paymentChannel): ?string
    {
        if ($paymentType === 'va' && ! in_array(strtoupper($paymentChannel ?? ''), DoitpayService::vaBankChannels(), true)) {
            return 'Pilih bank Virtual Account terlebih dahulu.';
        }

        if ($paymentType === 'ewallet' && ! in_array(strtoupper($paymentChannel ?? ''), array_keys(self::EWALLET_DISPLAY), true)) {
            return 'Pilih e-wallet terlebih dahulu.';
        }

        return null;
    }

    /**
     * @param  string  $returnRouteName  nama route return khusus flow ini, mis. 'campaign-donations.return'
     */
    protected function processPayment(
        DoitpayService $doitpay,
        string $invoiceNumber,
        array $validated,
        string $paymentType,
        ?string $paymentChannel,
        string $itemName,
        string $returnRouteName
    ): array {
        return match ($paymentType) {
            'va' => $this->callVaGateway($doitpay, $invoiceNumber, $validated, strtoupper($paymentChannel)),
            'ewallet' => $this->callEwalletGateway($doitpay, $invoiceNumber, $validated, strtoupper($paymentChannel), $returnRouteName),
            'qris' => $this->callQrisGateway($doitpay, $invoiceNumber, $validated),
            'credit_card' => $this->callCreditCardGateway($doitpay, $invoiceNumber, $validated, $returnRouteName), // <-- tambahan
            default => $this->callPaymentLinkGateway($doitpay, $invoiceNumber, $validated, $itemName, $returnRouteName),
        };
    }

    protected function callVaGateway(DoitpayService $doitpay, string $invoiceNumber, array $validated, string $bankChannel): array
    {
        $result = $doitpay->createVirtualAccount([
            'bank_channel' => $bankChannel,
            'trx_id' => $invoiceNumber,
            'amount' => $validated['amount'],
            'customer_name' => $validated['name'],
            'customer_email' => $validated['email'],
            'customer_phone' => $validated['phone'] ?? '08000000000',
            'expired_minutes' => 60,
        ]);

        $vaData = $result['virtualAccountData'] ?? [];

        if (empty($vaData['virtualAccountNo'])) {
            throw new Exception('Doitpay tidak mengembalikan nomor Virtual Account.');
        }

        return [
            'va_bank_channel' => $bankChannel,
            'va_customer_no' => $vaData['customerNo'] ?? null,
            'va_number' => $vaData['virtualAccountNo'],
            'va_expired_at' => isset($vaData['expiredDate']) ? \Carbon\Carbon::parse($vaData['expiredDate']) : null,
        ];
    }

    protected function callEwalletGateway(DoitpayService $doitpay, string $invoiceNumber, array $validated, string $channel, string $returnRouteName): array
    {
        $result = $doitpay->createEwalletPayment([
            'partner_reference_no' => $invoiceNumber,
            'amount' => $validated['amount'],
            'return_url' => route($returnRouteName, $invoiceNumber),
            'notify_url' => route('donations.notify'),
            'channel' => $channel,
            'customer_phone' => $validated['phone'] ?? '08000000000',
            'customer_name' => $validated['name'],
            'customer_email' => $validated['email'],
        ]);

        if (empty($result['webRedirectUrl'])) {
            throw new Exception('Doitpay tidak mengembalikan URL pembayaran e-wallet.');
        }

        return [
            'reference_no' => $result['referenceNo'] ?? null,
            'payment_url' => $result['webRedirectUrl'],
        ];
    }

    protected function callQrisGateway(DoitpayService $doitpay, string $invoiceNumber, array $validated): array
    {
        $result = $doitpay->createQrisPayment([
            'partner_reference_no' => $invoiceNumber,
            'amount' => $validated['amount'],
            'valid_minutes' => 30,
        ]);

        if (empty($result['qrContent'])) {
            throw new Exception('Doitpay tidak mengembalikan kode QRIS.');
        }

        return [
            'reference_no' => $result['referenceNo'] ?? null,
            'qr_reference_no' => $result['referenceNo'] ?? null,
            'qr_content' => $result['qrContent'],
            'qr_expired_at' => now()->addMinutes(30),
        ];
    }

    protected function callCreditCardGateway(DoitpayService $doitpay, string $invoiceNumber, array $validated, string $returnRouteName): array
    {
        $result = $doitpay->createCreditCardPayment([
            'partner_reference_no' => $invoiceNumber,
            'amount' => $validated['amount'],
            'return_url' => route($returnRouteName, $invoiceNumber),
            'notify_url' => route('donations.notify'),
            'customer_phone' => $validated['phone'] ?? '08000000000',
            'customer_name' => $validated['name'],
            'customer_email' => $validated['email'],
        ]);

        if (empty($result['webRedirectUrl'])) {
            throw new Exception('Doitpay tidak mengembalikan URL pembayaran kartu kredit.');
        }

        return [
            'reference_no' => $result['referenceNo'] ?? null,
            'payment_url' => $result['webRedirectUrl'],
        ];
    }

    protected function callPaymentLinkGateway(DoitpayService $doitpay, string $invoiceNumber, array $validated, string $itemName, string $returnRouteName): array
    {
        $result = $doitpay->createPaymentLink([
            'partner_reference_no' => $invoiceNumber,
            'amount' => $validated['amount'],
            'return_url' => route($returnRouteName, $invoiceNumber),
            'notify_url' => route('donations.notify'),
            'items' => [
                [
                    'item_name' => $itemName,
                    'quantity' => 1,
                    'price' => (string) (int) round((float) $validated['amount']),
                ],
            ],
            'customer_name' => $validated['name'],
            'customer_email' => $validated['email'],
            'customer_mobile_no' => $validated['phone'] ?? null,
            'notes' => $validated['notes'] ?? null,
        ]);

        if (empty($result['webRedirectUrl'])) {
            throw new Exception('Doitpay tidak mengembalikan URL pembayaran.');
        }

        return [
            'reference_no' => $result['referenceNo'] ?? null,
            'payment_url' => $result['webRedirectUrl'],
        ];
    }

    protected function sanitizeItemName(string $title): string
    {
        $safe = preg_replace('/[^A-Za-z0-9\s\-\.,]/', '', $title);
        $safe = trim(preg_replace('/\s+/', ' ', $safe));

        return \Illuminate\Support\Str::limit($safe, 37, '...');
    }

    /**
     * Endpoint generik untuk polling/tombol "cek status" manual.
     * Dipanggil dari route POST {slug}/{donation:invoice_number}/check-status.
     */
    public function checkStatus(Transaction $donation, DoitpayService $doitpay)
    {
        if (in_array($donation->transaction_status, ['success', 'failed', 'expired'], true)) {
            return response()->json(['status' => $donation->transaction_status]);
        }

        try {
            if ($donation->qr_reference_no) {
                $status = $doitpay->checkQrisStatus($donation->invoice_number, $donation->qr_reference_no);
            } elseif ($donation->va_number) {
                $status = $doitpay->checkVirtualAccountStatus(
                    $donation->va_bank_channel,
                    $donation->va_customer_no,
                    $donation->va_number,
                    $donation->invoice_number
                );
            } else {
                $status = $doitpay->checkPaymentStatus($donation->invoice_number);
            }

            $mapped = Transaction::mapDoitpayStatus($status['latestTransactionStatus'] ?? '');

            if ($mapped !== 'initiated') {
                $donation->update([
                    'transaction_status' => $mapped,
                    'paid_at' => isset($status['paidTime']) ? \Carbon\Carbon::parse($status['paidTime']) : $donation->paid_at,
                ]);
            }

            return response()->json(['status' => $mapped]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json(['status' => $donation->transaction_status, 'error' => true], 200);
        }
    }

    protected function refreshStatusFromDoitpay(Transaction $donation, DoitpayService $doitpay): void
    {
        try {
            if ($donation->qr_reference_no) {
                $status = $doitpay->checkQrisStatus($donation->invoice_number, $donation->qr_reference_no);
            } else {
                $status = $doitpay->checkPaymentStatus($donation->invoice_number);
            }

            $donation->update([
                'transaction_status' => Transaction::mapDoitpayStatus($status['latestTransactionStatus'] ?? ''),
                'paid_at' => isset($status['paidTime']) ? \Carbon\Carbon::parse($status['paidTime']) : $donation->paid_at,
            ]);
        } catch (\Throwable $e) {
            report($e);
        }
    }

    protected function resolveExpiresAt(string $paymentType, array $paymentResult): \Carbon\Carbon
    {
        return match ($paymentType) {
            'va' => $paymentResult['va_expired_at'] ?? now()->addMinutes(60),
            'qris' => $paymentResult['qr_expired_at'] ?? now()->addMinutes(30),
            default => now()->addMinutes(25), // ewallet, credit_card, payment_link — sesuai default validUpTo()
        };
    }
}