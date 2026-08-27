<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\LiveTickerWidget;
use App\Filament\Widgets\DonorStatsWidget;
use App\Filament\Widgets\TransactionChartWidget;
use App\Filament\Widgets\CampaignAttentionWidget;
use App\Filament\Widgets\PaymentMethodWidget;
use App\Filament\Widgets\RecentActivityWidget;
use App\Filament\Widgets\ProgramUpdatesWidget;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getColumns(): array
    {
        return 2;
    }

    public function getWidgets(): array
    {
        return [
            LiveTickerWidget::class,        // paling atas
            DonorStatsWidget::class,        // stats total dana, donatur, campaign
            TransactionChartWidget::class,  // chart tren transaksi
            CampaignAttentionWidget::class, // campaign perlu perhatian
            PaymentMethodWidget::class,     // breakdown metode bayar
            RecentActivityWidget::class,    // aktivitas terakhir
            ProgramUpdatesWidget::class,    // update program
        ];
    }
}