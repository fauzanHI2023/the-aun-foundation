<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\Widget;

class RecentActivityWidget extends Widget
{
    protected string $view = 'filament.widgets.recent-activity';

    protected int|string|array $columnSpan = 1;

    protected static ?int $sort = 4;

    public function getActivities()
    {
        return Transaction::with('items.program')
            ->where('transaction_status', 'success')
            ->latest('paid_at')
            ->limit(5)
            ->get()
            ->map(fn ($t) => [
                'title'  => (optional($t->items->first()?->program)->title_program ?? $t->invoice_number),
                'donor'  => strtoupper($t->name),
                'time'   => optional($t->paid_at ?? $t->created_at)->format('H:i'),
                'amount' => number_format($t->grand_total, 0, ',', '.'),
            ]);
    }
}
