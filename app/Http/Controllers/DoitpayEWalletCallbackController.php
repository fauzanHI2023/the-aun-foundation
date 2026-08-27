<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DoitpayEWalletCallbackController extends Controller
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
            Log::warning('Doitpay ewallet callback: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4015600',
                'responseMessage' => 'Invalid Signature',
            ], 401);
        }

        $payload = $request->validate([
            'originalPartnerReferenceNo' => ['required', 'string'],
            'originalReferenceNo' => ['required', 'string'],
            'latestTransactionStatus' => ['required', 'string'],
            'amount.value' => ['required', 'string'],
            'additionalInfo.channelCode' => ['nullable', 'string'],
        ]);

        $donation = Transaction::where('invoice_number', $payload['originalPartnerReferenceNo'])
            ->orWhere('reference_no', $payload['originalReferenceNo'])
            ->first();

        if (! $donation) {
            Log::warning('Doitpay ewallet callback: transaction not found', $payload);

            return response()->json([
                'responseCode' => '4045600',
                'responseMessage' => 'Transaction Not Found',
            ], 404);
        }

        // Kalau status di DB sudah final, tidak perlu ditimpa lagi.
        if (! in_array($donation->transaction_status, ['success', 'failed', 'expired'], true)) {
            $mapped = Transaction::mapDoitpayStatus($payload['latestTransactionStatus']);

            $donation->update([
                'transaction_status' => $mapped,
                'paid_at' => $mapped === 'success' ? now() : $donation->paid_at,
            ]);
        }

        return response()->json([
            'responseCode' => '2005600',
            'responseMessage' => 'Successful',
        ]);
    }
}