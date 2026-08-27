<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DonorDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = Auth::user();

        $transactions = Transaction::with('items.campaign', 'items.program')
            ->where('email', $user->email)
            ->orderByDesc('created_at')
            ->get();

        $successTransactions = $transactions->where('transaction_status', 'success');

        $totalDonated = $successTransactions->sum('grand_total');
        $txCount = $successTransactions->count();
        $avgDonation = $txCount > 0 ? $totalDonated / $txCount : 0;

        // === statusBreakdown ===
        $statusLabels = [
            'success' => 'Success',
            'pending' => 'Pneding',
            'failed'  => 'Failed',
            'expired' => 'Expired',
        ];
        $statusBreakdown = collect($statusLabels)->map(function ($label, $status) use ($transactions) {
            return [
                'status' => $status,
                'label' => $label,
                'count' => $transactions->where('transaction_status', $status)->count(),
            ];
        })->filter(fn ($s) => $s['count'] > 0)->values();

        // === trend (daily / weekly / monthly) ===
        $daily = collect(range(29, 0))->map(function ($i) use ($successTransactions) {
            $date = now()->subDays($i)->startOfDay();
            $sum = $successTransactions
                ->filter(fn ($t) => $t->created_at->isSameDay($date))
                ->sum('grand_total');
            return ['label' => $date->translatedFormat('d M'), 'value' => (float) $sum];
        });

        $weekly = collect(range(11, 0))->map(function ($i) use ($successTransactions) {
            $start = now()->subWeeks($i)->startOfWeek();
            $end = now()->subWeeks($i)->endOfWeek();
            $sum = $successTransactions
                ->filter(fn ($t) => $t->created_at->between($start, $end))
                ->sum('grand_total');
            return ['label' => $start->translatedFormat('d M'), 'value' => (float) $sum];
        });

        $monthly = collect(range(11, 0))->map(function ($i) use ($successTransactions) {
            $month = now()->subMonths($i);
            $sum = $successTransactions
                ->filter(fn ($t) => $t->created_at->isSameMonth($month) && $t->created_at->isSameYear($month))
                ->sum('grand_total');
            return ['label' => $month->translatedFormat('M'), 'value' => (float) $sum];
        });

        $trend = [
            'daily'   => ['labels' => $daily->pluck('label'),   'values' => $daily->pluck('value')],
            'weekly'  => ['labels' => $weekly->pluck('label'),  'values' => $weekly->pluck('value')],
            'monthly' => ['labels' => $monthly->pluck('label'), 'values' => $monthly->pluck('value')],
        ];

        // === heatmap: flat array of counts, 84 hari (12 minggu x 7 hari), lama -> baru ===
        $heatmap = collect(range(83, 0))->map(function ($i) use ($successTransactions) {
            $date = now()->subDays($i)->startOfDay();
            return $successTransactions
                ->filter(fn ($t) => $t->created_at->isSameDay($date))
                ->count();
        })->values();

        // === paymentMethods: { method, percent } — pakai payment_channel ===
        $paymentMethods = $successTransactions
            ->groupBy(fn ($t) => $t->payment_channel ?? 'Lainnya')
            ->map(fn ($group, $method) => [
                'method' => $method,
                'count' => $group->count(),
            ])
            ->values()
            ->sortByDesc('count')
            ->values();

        $totalPaymentCount = $paymentMethods->sum('count');
        $paymentMethods = $paymentMethods->map(function ($m) use ($totalPaymentCount) {
            $m['percent'] = $totalPaymentCount > 0 ? round(($m['count'] / $totalPaymentCount) * 100) : 0;
            unset($m['count']);
            return $m;
        });

        // === campaigns (tidak berubah) ===
        $campaignsSupported = $successTransactions
            ->map(fn ($t) => $t->items->first()?->campaign)
            ->filter()
            ->unique('id')
            ->values();

        $campaignCards = $campaignsSupported->map(function ($campaign) use ($successTransactions) {
            $collected = \App\Models\TransactionItem::where('campaign_id', $campaign->id)
                ->whereHas('transaction', fn ($q) => $q->where('transaction_status', 'success'))
                ->sum('subtotal');

            $yourContribution = $successTransactions
                ->filter(fn ($t) => $t->items->first()?->campaign_id === $campaign->id)
                ->sum('grand_total');

            $daysLeft = $campaign->end_date
                ? max(0, now()->startOfDay()->diffInDays($campaign->end_date, false))
                : null;

            return [
                'id' => $campaign->id,
                'title' => $campaign->title,
                'category' => $campaign->category ?? null,
                'thumbnail' => $campaign->thumbnail_url,
                'percent' => $campaign->target_amount > 0
                    ? min(100, round(($collected / $campaign->target_amount) * 100))
                    : 0,
                'collected' => $collected,
                'target' => $campaign->target_amount,
                'your_contribution' => $yourContribution,
                'days_left' => $daysLeft,
            ];
        })->values();

        // === transactions — method sekarang pakai payment_channel, + date_iso untuk filter tanggal ===
        $transactionRows = $transactions->map(function ($t) {
            $item = $t->items->first();

            return [
                'invoice_number' => $t->invoice_number,
                'campaign_title' => $item?->campaign_title ?? $item?->program_title ?? 'Donasi Umum',
                'campaign_thumbnail' => $item?->campaign?->thumbnail_url ?? $item?->program?->thumbnail,
                'date' => $t->created_at?->translatedFormat('d M Y'),
                'date_iso' => $t->created_at?->toDateString(),
                'method' => $t->payment_channel ?? '-',
                'amount' => $t->grand_total,
                'status' => $t->transaction_status,
            ];
        });

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_donated' => (float) $totalDonated,
                'tx_count' => (int) $txCount,
                'campaigns_count' => (int) $campaignCards->count(),
                'avg_donation' => (float) $avgDonation,
            ],
            'campaigns' => $campaignCards,
            'transactions' => $transactionRows,
            'statusBreakdown' => $statusBreakdown,
            'paymentMethods' => $paymentMethods,
            'trend' => $trend,
            'heatmap' => $heatmap,
        ]);
    }
}
