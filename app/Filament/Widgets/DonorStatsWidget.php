<?php

namespace App\Filament\Widgets;

use App\Models\Campaign;
use App\Models\Transaction;
use Filament\Widgets\Widget;

class DonorStatsWidget extends Widget
{
    protected int|string|array $columnSpan = 1;
    protected static ?int $sort = 1;

    protected string $view = 'filament.widgets.donor-stats-widget';

    public function getViewData(): array
    {
        $total = Transaction::where('transaction_status', 'success')->sum('grand_total');
        $changePercent = $this->getMonthOverMonthChange();

        $donorCount = Transaction::where('transaction_status', 'success')
            ->distinct('email')
            ->count('email');

        return [
            'total' => $total,
            'changePercent' => $changePercent,
            'donorCount' => $donorCount,
            'campaignCount' => Campaign::count(),
        ];
    }

    private function getMonthOverMonthChange(): float
    {
        $thisMonth = Transaction::where('transaction_status', 'success')
            ->whereMonth('paid_at', now()->month)
            ->whereYear('paid_at', now()->year)
            ->sum('grand_total');

        $lastMonth = Transaction::where('transaction_status', 'success')
            ->whereMonth('paid_at', now()->subMonth()->month)
            ->whereYear('paid_at', now()->subMonth()->year)
            ->sum('grand_total');

        if ($lastMonth == 0) {
            return 0;
        }

        return round((($thisMonth - $lastMonth) / $lastMonth) * 100, 1);
    }
}