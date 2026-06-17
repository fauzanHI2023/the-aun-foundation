<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Notification;
use Midtrans\Snap;

class CheckoutController extends Controller
{
    /*
    =========================================
    CHECKOUT PAGE
    =========================================
    */
    public function index()
    {
        $cart = session()->get('cart', []);

        $grandTotal = collect($cart)
            ->sum('subtotal');

        return Inertia::render(
            'Checkout/Index',
            [
                'cart' => array_values($cart),
                'grandTotal' => $grandTotal,
            ]
        );
    }

    /*
    =========================================
    CREATE TRANSACTION
    =========================================
    */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'nullable',
        ]);

        $cart = session()->get('cart', []);

        if (empty($cart)) {

            return back()->with(
                'error',
                'Cart kosong'
            );
        }

        DB::beginTransaction();

        try {

            MidtransService::init();

            $grandTotal = collect($cart)
                ->sum('subtotal');

            $transaction = Transaction::create([

                'invoice_number' =>
                    'INV-' . now()->format('YmdHis'),

                'user_id' => auth()->id(),

                'name' => $request->name,

                'email' => $request->email,

                'phone' => $request->phone,

                'grand_total' => $grandTotal,

                'transaction_status' => 'pending',

            ]);

            $midtransItems = [];

            foreach ($cart as $item) {

                TransactionItem::create([

                    'transaction_id' =>
                        $transaction->id,

                    'campaign_id' =>
                        $item['campaign_id'],

                    'campaign_title' =>
                        $item['title'],

                    'amount' =>
                        $item['amount'],

                    'quantity' => 1,

                    'subtotal' =>
                        $item['subtotal'],
                ]);

                $midtransItems[] = [

                    'id' => $item['campaign_id'],

                    'price' => $item['amount'],

                    'quantity' => 1,

                    'name' => $item['title'],
                ];
            }

            $params = [

                'transaction_details' => [

                    'order_id' =>
                        $transaction->invoice_number,

                    'gross_amount' =>
                        $grandTotal,
                ],

                'item_details' => $midtransItems,

                'customer_details' => [

                    'first_name' =>
                        $request->name,

                    'email' =>
                        $request->email,

                    'phone' =>
                        $request->phone,
                ],
            ];

            $snapToken =
                Snap::getSnapToken($params);

            $transaction->update([
                'snap_token' => $snapToken,
            ]);

            $options = [
                'headers' => [
                    'X-Override-Notification' => 'https://domainanda.com/api/midtrans/callback'
                ]
            ];

            DB::commit();

            /*
            HAPUS CART
            */
            session()->forget('cart');

            return response()->json([
                'snap_token' => $snapToken,
            ]);

        } catch (\Throwable $th) {

            DB::rollBack();

            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    /*
    =========================================
    MIDTRANS CALLBACK
    =========================================
    */
    public function callback(Request $request)
    {
        MidtransService::init();

        $notification = new Notification();

        $transactionStatus =
            $notification->transaction_status;

        $orderId =
            $notification->order_id;

        $transaction = Transaction::query()
            ->where(
                'invoice_number',
                $orderId
            )
            ->first();

        if (!$transaction) {

            return response()->json([
                'message' =>
                    'Transaction not found'
            ], 404);
        }

        if (
            $transactionStatus == 'capture' ||
            $transactionStatus == 'settlement'
        ) {

            $transaction->update([

                'transaction_status' =>
                    'paid',

                'paid_at' => now(),

                'payment_response' =>
                    json_encode($request->all()),
            ]);

            /*
            UPDATE CAMPAIGN COLLECTED
            */
            foreach (
                $transaction->items
                as $item
            ) {

                $item->campaign
                    ->increment(
                        'collected_amount',
                        $item->amount
                    );
            }

        } elseif (
            in_array(
                $transactionStatus,
                ['expire', 'cancel', 'deny']
            )
        ) {

            $transaction->update([

                'transaction_status' =>
                    'failed',

                'payment_response' =>
                    json_encode($request->all()),
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
