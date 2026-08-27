<?php

namespace App\Console\Commands;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Throwable;

class ExpireStaleDonations extends Command
{
    protected $signature = 'donations:expire-stale';

    protected $description = 'Cek transaksi initiated yang sudah lewat waktu, konfirmasi ke Doitpay, lalu tandai expired kalau memang belum dibayar.';

    public function handle(DoitpayService $doitpay): int
    {
        $staleDonations = Transaction::where('transaction_status', 'initiated')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<', now())
            ->get();

        $this->info("Ditemukan {$staleDonations->count()} transaksi yang perlu dicek.");

        foreach ($staleDonations as $donation) {
            $this->checkAndExpire($donation, $doitpay);
        }

        return self::SUCCESS;
    }

    protected function checkAndExpire(Transaction $donation, DoitpayService $doitpay): void
    {
        try {
            // Konfirmasi dulu ke Doitpay — jaga-jaga kalau ternyata baru saja
            // dibayar tepat sebelum waktu habis, jangan sampai ketimpa "expired".
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

            if ($mapped === 'success') {
                $donation->update([
                    'transaction_status' => 'success',
                    'paid_at' => isset($status['paidTime']) ? \Carbon\Carbon::parse($status['paidTime']) : now(),
                ]);

                $this->line("  ✓ {$donation->invoice_number} ternyata sudah dibayar, status diperbarui jadi success.");
                return;
            }
        } catch (Throwable $e) {
            // Kalau gagal cek ke Doitpay (channel belum aktif, dsb),
            // tetap lanjut tandai expired berdasarkan waktu lokal saja.
            Log::warning('ExpireStaleDonations: gagal cek status ke Doitpay', [
                'invoice_number' => $donation->invoice_number,
                'error' => $e->getMessage(),
            ]);
        }

        $donation->update(['transaction_status' => 'expired']);
        $this->line("  ✗ {$donation->invoice_number} ditandai expired.");
    }
}