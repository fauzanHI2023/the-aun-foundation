<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class TransactionChartWidget extends ChartWidget
{
    protected ?string $heading = 'Tren Transaksi (30 Hari)';

    protected int|string|array $columnSpan = 1;

    protected ?string $maxHeight = '320px';

    public ?string $filter = 'revenue_target';

    protected static ?int $sort = 2;

    protected function getFilters(): ?array
    {
        return [
            'revenue_target' => 'Revenue vs Target',
            'revenue_only'   => 'Revenue saja',
        ];
    }

    protected function getData(): array
    {
        $days = collect(range(29, 0))->map(fn ($i) => Carbon::today()->subDays($i));

        $revenue = $days->map(
            fn (Carbon $day) => Transaction::where('transaction_status', 'success')
                ->whereDate('paid_at', $day)
                ->sum('grand_total')
        );

        // Target harian — sesuaikan dengan sumber data target kamu sendiri
        $target = $days->map(fn () => 15_000_000);

        $datasets = [
            [
                'label' => 'Revenue',
                'data' => $revenue,
                'borderColor' => '#d97706',
                'backgroundColor' => 'rgba(217, 119, 6, 0.25)',
                'fill' => true,
                'tension' => 0.4,
                'pointRadius' => 0,
                'borderWidth' => 2.5,
            ],
        ];

        if ($this->filter === 'revenue_target') {
            $datasets[] = [
                'label' => 'Target',
                'data' => $target,
                'borderColor' => 'rgba(255,255,255,0.3)',
                'backgroundColor' => 'transparent',
                'borderDash' => [4, 4],
                'fill' => false,
                'tension' => 0.4,
                'pointRadius' => 0,
                'borderWidth' => 1.5,
            ];
        }

        return [
            'datasets' => $datasets,
            'labels' => $days->map(fn (Carbon $d) => $d->format('d M'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'y' => [
                    'display' => false,
                ],
                'x' => [
                    'grid' => ['display' => false],
                    'ticks' => ['color' => 'rgba(255,255,255,0.35)', 'font' => ['family' => 'JetBrains Mono', 'size' => 10]],
                ],
            ],
            'plugins' => [
                'legend' => ['display' => false], // legend custom kita render di heading, lihat catatan di README
            ],
        ];
    }
}
