<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\Widget;

class LiveTickerWidget extends Widget
{
    protected string $view = 'filament.widgets.live-ticker';

    protected int|string|array $columnSpan = 'full';

    protected static ?int $sort = 7;

    // Livewire polling tiap 15 detik — pengganti websocket kalau belum ada.
    // Kalau sudah pakai Laravel Reverb/Pusher, ganti ini dengan
    // #[On('echo:transactions,TransactionPaid')] agar benar-benar real-time.
    protected static ?string $pollingInterval = '15s';

    public function getSignals()
    {
        return Transaction::with('items.program')
            ->where('transaction_status', 'success')
            ->latest('paid_at')
            ->limit(6)
            ->get()
            ->map(fn ($t) => [
                'amount' => 'Rp ' . number_format($t->grand_total, 0, ',', '.'),
                'label'  => optional($t->items->first()?->program)->title_program ?? $t->invoice_number,
                'time'   => optional($t->paid_at ?? $t->created_at)->diffForHumans(),
            ]);
    }
}
