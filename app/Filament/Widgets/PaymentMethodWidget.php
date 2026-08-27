<?php

namespace App\Filament\Widgets;

use App\Models\Transaction;
use Filament\Widgets\Widget;

class PaymentMethodWidget extends Widget
{
    protected string $view = 'filament.widgets.payment-method';

    protected int|string|array $columnSpan = 1;

    protected static ?int $sort = 3;

    public function getMethods(): array
    {
        $transactions = Transaction::where('transaction_status', 'success')->get();
        $total = $transactions->count();

        if ($total === 0) {
            return [];
        }

        return $transactions
            ->groupBy('payment_method') // accessor di model Transaction
            ->map(fn ($group, $method) => [
                'label' => strtoupper(str_replace('_', ' ', $method)),
                'percent' => round(($group->count() / $total) * 100, 2),
            ])
            ->sortByDesc('percent')
            ->values()
            ->toArray();
    }
}
