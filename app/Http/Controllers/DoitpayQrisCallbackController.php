<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DoitpayQrisCallbackController extends Controller
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
            Log::warning('Doitpay QRIS callback: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4015200',
                'responseMessage' => 'Invalid Signature',
            ], 401);
        }

        $payload = $request->validate([
            'originalPartnerReferenceNo' => ['required', 'string'],
            'originalReferenceNo' => ['required', 'string'],
            'latestTransactionStatus' => ['required', 'string'],
            'amount.value' => ['required', 'string'],
        ]);

        $donation = Transaction::where('invoice_number', $payload['originalPartnerReferenceNo'])
            ->orWhere('qr_reference_no', $payload['originalReferenceNo'])
            ->first();

        if (! $donation) {
            Log::warning('Doitpay QRIS callback: transaction not found', $payload);

            return response()->json([
                'responseCode' => '4045200',
                'responseMessage' => 'Transaction Not Found',
            ], 404);
        }

        $donation->update([
            'transaction_status' => Transaction::mapDoitpayStatus($payload['latestTransactionStatus']),
            'paid_at' => $payload['latestTransactionStatus'] === '00' ? now() : $donation->paid_at,
        ]);

        return response()->json([
            'responseCode' => '2005200',
            'responseMessage' => 'Successful',
        ]);
    }
}