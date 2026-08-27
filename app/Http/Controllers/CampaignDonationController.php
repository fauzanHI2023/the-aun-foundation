<?php

namespace App\Http\Controllers;

use App\Http\Traits\HandlesDoitpayPayment;
use App\Models\Campaign;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CampaignDonationController extends Controller
{
    use HandlesDoitpayPayment;

    public function index(): Response
    {
        $campaigns = Campaign::query()
            ->where('is_active', true)
            ->latest()
            ->get(['id', 'title', 'slug', 'thumbnail', 'short_description', 'description', 'target_amount', 'collected_amount']);

        return Inertia::render('Campaigns/Index', ['campaigns' => $campaigns]);
    }

    public function show(Campaign $campaign): Response
    {
        $donorsCount = Transaction::query()
            ->whereHas('items', fn ($q) => $q->where('campaign_id', $campaign->id))
            ->where('transaction_status', 'success')
            ->count();

        $collectedAmount = TransactionItem::where('campaign_id', $campaign->id)
            ->whereHas('transaction', fn ($q) => $q->where('transaction_status', 'success'))
            ->sum('subtotal');

        $daysLeft = $campaign->end_date
            ? max(0, now()->startOfDay()->diffInDays($campaign->end_date, false))
            : null;

        return Inertia::render('Campaigns/Show', [
            'campaign' => array_merge(
                $campaign->only(['id', 'title', 'slug', 'description', 'target_amount']),
                [
                    'thumbnail' => $campaign->thumbnail_url,
                    'collected_amount' => $collectedAmount,
                    'donors_count' => $donorsCount,
                    'days_left' => $daysLeft,
                ]
            ),
        ]);
    }

    public function checkout(Request $request, Campaign $campaign): Response
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:10000'],
        ], ['amount.min' => 'Minimal donasi adalah Rp10.000.']);

        return Inertia::render('Campaigns/Checkout', [
            'campaign' => $campaign->only(['id', 'title', 'slug', 'thumbnail']),
            'amount' => $validated['amount'],
            'paymentMethods' => $this->paymentMethodOptions(),
        ]);
    }

    public function store(Request $request, Campaign $campaign, DoitpayService $doitpay)
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

        $invoiceNumber = Transaction::generateInvoiceNumber(suffix: 'C');
        $itemName = $this->sanitizeItemName($campaign->title);

        try {
            $paymentResult = $this->processPayment(
                $doitpay, $invoiceNumber, $validated, $paymentType, $paymentChannel,
                $itemName, 'campaign-donations.return'
            );
        } catch (Throwable $e) {
            report($e);

            return back()->withInput()->withErrors([
                'payment' => 'Gagal memproses pembayaran. Silakan coba lagi atau pilih metode lain.',
            ]);
        }

        $donation = DB::transaction(function () use ($validated, $campaign, $invoiceNumber, $paymentResult, $paymentType, $paymentChannel) {
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
                'campaign_id' => $campaign->id,
                'campaign_title' => $campaign->title,
                'amount' => $validated['amount'],
                'quantity' => 1,
                'subtotal' => $validated['amount'],
            ]);

            return $transaction;
        });

        return $this->respondByPaymentType($paymentType, $paymentChannel, $donation, $campaign->title, $paymentResult);
    }

    protected function respondByPaymentType(string $paymentType, ?string $paymentChannel, Transaction $donation, string $itemTitle, array $paymentResult)
    {
        if ($paymentType === 'va') {
            return Inertia::render('Campaigns/VaInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                    'campaign_title' => $itemTitle,
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
            return Inertia::render('Campaigns/QrisInstruction', [
                'donation' => [
                    'invoice_number' => $donation->invoice_number,
                    'grand_total' => $donation->grand_total,
                    'campaign_title' => $itemTitle,
                ],
                'qris' => [
                    'qr_content' => $paymentResult['qr_content'],
                    'expired_date' => $paymentResult['qr_expired_at']?->toIso8601String(),
                ],
            ]);
        }

        return Inertia::location($paymentResult['payment_url']);
    }

    public function returnPage(Transaction $donation, DoitpayService $doitpay): Response
    {
        $this->refreshStatusFromDoitpay($donation, $doitpay);

        $donation->load('items.campaign');
        $campaign = $donation->items->first()?->campaign;

        $progress = null;

        if ($campaign) {
            $donorsCount = Transaction::query()
                ->whereHas('items', fn ($q) => $q->where('campaign_id', $campaign->id))
                ->where('transaction_status', 'success')
                ->count();

            $progress = [
                'thumbnail' => $campaign->thumbnail_url,
                'category' => $campaign->category ?? null,
                'location' => $campaign->location ?? null,
                'collected_amount' => $campaign->collected_amount,
                'target_amount' => $campaign->target_amount,
                'donors_count' => $donorsCount,
            ];
        }

        return Inertia::render('Campaigns/Return', [
            'donation' => array_merge(
                $donation->only(['name', 'email', 'invoice_number', 'grand_total', 'transaction_status', 'paid_at']),
                [
                    'items' => $donation->items->map->only(['campaign_title', 'amount']),
                    'campaign' => $progress,
                ]
            ),
        ]);
    }
}