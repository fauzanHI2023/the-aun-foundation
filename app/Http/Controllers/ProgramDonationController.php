<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesDoitpayPayment;
use App\Models\Program;
use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProgramDonationController extends Controller
{
    use HandlesDoitpayPayment;

    /**
     * Halaman detail program, pilih nominal / custom nominal.
     */
    public function show(Program $program): Response
    {
        return Inertia::render('Programs/Show', [
            'program' => $program->only([
                'id', 'title_program', 'focus', 'description',
                'goals', 'thumbnail', 'collected', 'program_type',
            ]),
        ]);
    }

    /**
     * Halaman checkout: nominal sudah dipilih, tampilkan program + form data diri.
     */
    public function checkout(Request $request, Program $program): Response
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:10000'],
        ], ['amount.min' => 'Minimal donasi adalah Rp10.000.']);

        return Inertia::render('Programs/Checkout', [
            'program' => $program->only(['id', 'title_program', 'thumbnail']),
            'amount' => $validated['amount'],
            'paymentMethods' => $this->paymentMethodOptions(),
        ]);
    }

    /**
     * Proses submit checkout donasi program.
     * payment_type: 'va' | 'ewallet' | 'qris' | 'credit_card' | 'payment_link' (default)
     */
    public function store(Request $request, Program $program, DoitpayService $doitpay)
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

        $invoiceNumber = Transaction::generateInvoiceNumber(suffix: 'P');
        $itemName = $this->sanitizeItemName($program->title_program);

        // 1. Panggil Doitpay DULU — belum ada apapun disimpan ke database.
        //    Kalau gagal, tidak ada baris transaksi "sampah" yang tersimpan.
        try {
            $paymentResult = $this->processPayment(
                $doitpay, $invoiceNumber, $validated, $paymentType, $paymentChannel,
                $itemName, 'program-donations.return'
            );
        } catch (Throwable $e) {
            report($e);

            return back()->withInput()->withErrors([
                'payment' => 'Gagal memproses pembayaran. Silakan coba lagi atau pilih metode lain.',
            ]);
        }

        // 2. Baru simpan ke database SETELAH terbukti berhasil di Doitpay.
        $donation = DB::transaction(function () use ($validated, $program, $invoiceNumber, $paymentType, $paymentChannel, $paymentResult) {
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
                    'expires_at' => $this->resolveExpiresAt($paymentType, $paymentResult),
                ],
                $paymentResult
            ));

            $transaction->items()->create([
                'program_id' => $program->id,
                'program_title' => $program->title_program,
                'amount' => $validated['amount'],
                'quantity' => 1,
                'subtotal' => $validated['amount'],
            ]);

            return $transaction;
        });

        return $this->respondByPaymentType($paymentType, $paymentChannel, $donation, $program->title_program, $paymentResult);
    }

    /**
     * Render halaman instruksi (VA/QRIS) atau redirect (Ewallet/Credit Card/Payment Link)
     * sesuai jenis pembayaran yang dipilih.
     */
    protected function respondByPaymentType(string $paymentType, ?string $paymentChannel, Transaction $donation, string $itemTitle, array $paymentResult)
    {
        if ($paymentType === 'va') {
            return Inertia::render('Programs/VaInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                    'program_title' => $itemTitle,
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
            return Inertia::render('Programs/QrisInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                    'program_title' => $itemTitle,
                ],
                'qris' => [
                    'qr_content' => $paymentResult['qr_content'],
                    'expired_date' => $paymentResult['qr_expired_at']?->toIso8601String(),
                ],
            ]);
        }

        // ewallet, credit_card, payment_link — semuanya redirect eksternal ke Doitpay
        return Inertia::location($paymentResult['payment_url']);
    }

    /**
     * Halaman setelah kembali dari Doitpay untuk donasi program
     * (juga dipanggil otomatis setelah countdown VA/QRIS habis di frontend).
     */
    public function returnPage(Transaction $donation, DoitpayService $doitpay): Response
    {
        $this->refreshStatusFromDoitpay($donation, $doitpay);

        $donation->load('items.program');

        return Inertia::render('Programs/Return', [
            'donation' => array_merge(
                $donation->only(['name', 'email', 'invoice_number', 'grand_total', 'transaction_status', 'paid_at']),
                ['items' => $donation->items->map->only(['program_title', 'amount'])]
            ),
        ]);
    }
}