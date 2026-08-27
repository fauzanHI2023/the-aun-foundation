<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str; 

class DoitpayNotificationController extends Controller
{
    public function handle(Request $request, DoitpayService $doitpay)
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
            Log::warning('Doitpay notify: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4015600',
                'responseMessage' => 'Invalid Signature',
            ], 401);
        }

        $payload = $request->validate([
            'originalPartnerReferenceNo' => ['required', 'string'],
            'originalReferenceNo' => ['nullable', 'string'],
            'latestTransactionStatus' => ['required', 'string'],
            'amount.value' => ['nullable', 'string'],
            'amount.currency' => ['nullable', 'string'],
        ]);

        $rawPartnerRef = $payload['originalPartnerReferenceNo'];

        $extractedInvoiceNumber = Str::contains($rawPartnerRef, '-doitpay-')
        ? Str::afterLast($rawPartnerRef, '-doitpay-')
        : $rawPartnerRef;

        $donation = Transaction::where('invoice_number', $rawPartnerRef)
            ->orWhere('invoice_number', $extractedInvoiceNumber)
            ->orWhere('reference_no', $payload['originalReferenceNo'] ?? null)
            ->first();

        if (! $donation) {
            Log::warning('Doitpay notify: transaction not found', $payload);

            return response()->json([
                'responseCode' => '4045600',
                'responseMessage' => 'Transaction Not Found',
            ], 404);
        }

        $status = Transaction::mapDoitpayStatus($payload['latestTransactionStatus']);

        $donation->update([
            'reference_no' => $payload['originalReferenceNo'] ?? $donation->reference_no,
            'transaction_status' => $status,  // <-- sesuaikan nama kolom
            'paid_at' => $status === 'success' ? now() : $donation->paid_at,
        ]);

        // TODO: trigger event/notification (misal kirim email ucapan terima kasih donatur) di sini.

        return response()->json([
            'responseCode' => '2005600',
            'responseMessage' => 'Successful',
        ]);
    }
}