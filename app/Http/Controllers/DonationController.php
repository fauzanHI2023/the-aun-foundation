<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesDoitpayPayment;
use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DonationController extends Controller
{
    use HandlesDoitpayPayment;

    public function create(): Response
    {
        return Inertia::render('Donations/Create', [
            'paymentMethods' => $this->paymentMethodOptions(),
        ]);
    }

    public function store(Request $request, DoitpayService $doitpay)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'amount' => ['required', 'numeric', 'min:10000'],
            'notes' => ['nullable', 'string', 'max:255'],
            'payment_type' => ['nullable', 'string', 'in:va,ewallet,qris,credit_card,payment_link'],
            'payment_channel' => ['nullable', 'string'],
        ], ['amount.min' => 'Minimal donasi adalah Rp10.000.']);

        $paymentType = $validated['payment_type'] ?? 'payment_link';
        $paymentChannel = $validated['payment_channel'] ?? null;

        if ($error = $this->validatePaymentSelection($paymentType, $paymentChannel)) {
            return back()->withInput()->withErrors(['payment' => $error]);
        }

        $invoiceNumber = Transaction::generateInvoiceNumber(suffix: 'U');
        $itemName = 'Donasi Umum';

        try {
            $paymentResult = $this->processPayment(
                $doitpay, $invoiceNumber, $validated, $paymentType, $paymentChannel,
                $itemName, 'donations.return'
            );
        } catch (Throwable $e) {
            report($e);

            return back()->withInput()->withErrors([
                'payment' => 'Gagal memproses pembayaran. Silakan coba lagi atau pilih metode lain.',
            ]);
        }

        $donation = DB::transaction(function () use ($validated, $invoiceNumber, $paymentResult, $paymentType, $paymentChannel) {
            $transaction = Transaction::create(array_merge(
                [
                    'invoice_number' => $invoiceNumber,
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'] ?? null,
                    'grand_total' => $validated['amount'],
                    'notes' => $validated['notes'] ?? null,
                    'transaction_status' => 'initiated',
                    'payment_method' => $this->mapPaymentMethodLabel($paymentType),
                    'payment_channel' => $this->resolvePaymentChannel($paymentType, $paymentChannel),
                ],
                $paymentResult
            ));

            $transaction->items()->create([
                'campaign_id' => null,
                'campaign_title' => 'Donasi Umum',
                'amount' => $validated['amount'],
                'quantity' => 1,
                'subtotal' => $validated['amount'],
            ]);

            return $transaction;
        });

        return $this->respondByPaymentType($paymentType, $paymentChannel, $donation, $paymentResult);
    }

    protected function respondByPaymentType(string $paymentType, ?string $paymentChannel, Transaction $donation, array $paymentResult)
    {
        if ($paymentType === 'va') {
            return Inertia::render('Donations/VaInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                ],
                'va' => [
                    'bank_channel' => strtoupper($paymentChannel),
                    'bank_label' => self::VA_BANKS_DISPLAY[strtoupper($paymentChannel)]['label'] ?? $paymentChannel,
                    'virtual_account_no' => $paymentResult['va_number'],
                    'expired_date' => $paymentResult['va_expired_at']?->toIso8601String(),
                ],
            ]);
        }

        if ($paymentType === 'qris') {
            return Inertia::render('Donations/QrisInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                ],
                'qris' => [
                    'qr_content' => $paymentResult['qr_content'],
                    'expired_date' => $paymentResult['qr_expired_at']?->toIso8601String(),
                ],
            ]);
        }

        return Inertia::location($paymentResult['payment_url']);
    }

    public function returnPage(Transaction $donation, DoitpayService $doitpay): Response
    {
        $this->refreshStatusFromDoitpay($donation, $doitpay);

        return Inertia::render('Donations/Return', [
            'donation' => $donation->only(['name', 'invoice_number', 'grand_total', 'transaction_status', 'paid_at']),
        ]);
    }
}