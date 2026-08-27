<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DoitpayVaCallbackController extends Controller
{
    public function __invoke(Request $request, DoitpayService $doitpay)
    {
        $rawBody = $request->getContent();
        $timestamp = $request->header('X-TIMESTAMP', '');
        $signature = $request->header('X-SIGNATURE', '');
        $endpoint = '/'.ltrim($request->path(), '/');

        $isValid = $doitpay->verifyNotificationSignature(
            method: $request->method(),
            endpoint: $endpoint,
            rawRequestBody: $rawBody,
            timestamp: $timestamp,
            receivedSignature: $signature,
        );

        if (! $isValid) {
            Log::warning('Doitpay VA callback: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4012500',
                'responseMessage' => 'Invalid Signature',
            ], 401);
        }

        $payload = $request->validate([
            'trxId' => ['required', 'string'],
            'virtualAccountNo' => ['required', 'string'],
            'paidAmount.value' => ['required', 'string'],
        ]);

        $donation = Transaction::where('invoice_number', $payload['trxId'])->first();

        if (! $donation) {
            Log::warning('Doitpay VA callback: transaction not found', $payload);

            return response()->json([
                'responseCode' => '4042512',
                'responseMessage' => 'Bill Not Found',
            ], 404);
        }

        // --- Validasi paidAmount HARUS sama dengan totalAmount transaksi (Close Amount) ---
        $paidAmount = (float) $payload['paidAmount']['value'];
        $expectedAmount = (float) $donation->grand_total;

        if (abs($paidAmount - $expectedAmount) > 0.01) {
            Log::warning('Doitpay VA callback: paidAmount mismatch', [
                'trxId' => $payload['trxId'],
                'expected' => $expectedAmount,
                'paid' => $paidAmount,
            ]);

            $donation->update(['transaction_status' => 'amount_mismatch']);

            return response()->json([
                'responseCode' => '4002501',
                'responseMessage' => 'Paid amount does not match expected amount',
            ], 400);
        }

        $donation->update([
            'transaction_status' => 'success',
            'paid_at' => now(),
        ]);

        return response()->json([
            'responseCode' => '2002500',
            'responseMessage' => 'Berhasil menerima callback payment virtual account',
            'virtualAccountData' => [
                'partnerServiceId' => $request->input('partnerServiceId'),
                'customerNo' => $request->input('customerNo'),
                'virtualAccountNo' => $payload['virtualAccountNo'],
                'paymentRequestId' => $request->input('paymentRequestId'),
                'paidAmount' => $payload['paidAmount'],
                'virtualAccountName' => $donation->name,
            ],
        ]);
    }
}