<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DonationCheckController extends Controller
{
    public function index(Request $request): Response
    {
        $invoiceNumber = $request->query('invoice_number');

        if (! $invoiceNumber) {
            return Inertia::render('Transactions/Check', [
                'donation' => null,
                'searched' => false,
            ]);
        }

        $donation = Transaction::with('items.campaign', 'items.program')
            ->where('invoice_number', trim($invoiceNumber))
            ->first();

        if (! $donation) {
            return Inertia::render('Transactions/Check', [
                'donation' => null,
                'searched' => true,
                'notFoundFor' => $invoiceNumber,
            ]);
        }

        $item = $donation->items->first();
        $campaign = $item?->campaign;
        $program = $item?->program;

        $target = null;
        $collected = null;
        $itemTitle = $item?->campaign_title ?? $item?->program_title ?? 'Donasi Umum';

        if ($campaign) {
            $target = $campaign->target_amount;
            $collected = TransactionItem::where('campaign_id', $campaign->id)
                ->whereHas('transaction', fn ($q) => $q->where('transaction_status', 'success'))
                ->sum('subtotal');
        } elseif ($program) {
            $target = $program->goals;
            $collected = TransactionItem::where('program_id', $program->id)
                ->whereHas('transaction', fn ($q) => $q->where('transaction_status', 'success'))
                ->sum('subtotal');
        }

        return Inertia::render('Transactions/Check', [
            'donation' => [
                'invoice_number' => $donation->invoice_number,
                'name' => $donation->name,
                'amount' => $donation->grand_total,
                'status' => $donation->transaction_status,
                'payment_method' => $donation->payment_method,
                'payment_channel' => $donation->payment_channel,
                'created_at' => $donation->created_at?->toIso8601String(),
                'paid_at' => $donation->paid_at?->toIso8601String(),
                'item_title' => $itemTitle,
                'target_amount' => $target,
                'collected_amount' => $collected,
            ],
            'searched' => true,
        ]);
    }
}