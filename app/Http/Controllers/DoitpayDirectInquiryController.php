<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\DoitpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DoitpayDirectInquiryController extends Controller
{
    /**
     * 11.6 - 11.9: Inquiry Virtual Account
     * Dipanggil BANK ke server kita, sebelum nasabah menyelesaikan pembayaran.
     */
    public function inquiry(Request $request, DoitpayService $doitpay)
    {
        $rawBody = $request->getContent();
        $timestamp = $request->header('X-TIMESTAMP', '');
        $signature = $request->header('X-SIGNATURE', '');
        $endpoint = '/'.ltrim($request->path(), '/');

        if (! $doitpay->verifyDirectInquirySignature('POST', $endpoint, $rawBody, $timestamp, $signature)) {
            Log::warning('Doitpay direct inquiry: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4012400',
                'responseMessage' => 'Unauthorized Signature',
            ], 401);
        }

        $payload = $request->validate([
            'virtualAccountNo' => ['required', 'string'],
            'customerNo' => ['required', 'string'],
            'inquiryRequestId' => ['required', 'string'],
        ]);

        // 11.9 — VA tidak terdaftar
        $donation = Transaction::where('va_number', trim($payload['virtualAccountNo']))->first();

        if (! $donation) {
            return response()->json([
                'responseCode' => '4042412',
                'responseMessage' => 'Bill not found',
            ], 404);
        }

        // 11.7 — sudah lunas
        if ($donation->transaction_status === 'success') {
            return response()->json([
                'responseCode' => '4042414',
                'responseMessage' => 'Bill has been paid',
            ], 404);
        }

        // 11.8 — kadaluarsa
        if ($donation->va_expired_at && now()->greaterThan($donation->va_expired_at)) {
            return response()->json([
                'responseCode' => '4042419',
                'responseMessage' => 'Bill expired',
            ], 404);
        }

        // 11.6 — valid
        return response()->json([
            'responseCode' => '2002400',
            'responseMessage' => 'Inquiry successful',
            'virtualAccountData' => [
                'inquiryStatus' => '00',
                'inquiryReason' => [
                    'english' => 'Valid account',
                    'indonesia' => 'Rekening valid',
                ],
                'partnerServiceId' => $payload['customerNo'],
                'customerNo' => $donation->va_customer_no,
                'virtualAccountNo' => $donation->va_number,
                'virtualAccountName' => $donation->name,
                'virtualAccountEmail' => $donation->email,
                'virtualAccountPhone' => $donation->phone,
                'inquiryRequestId' => $payload['inquiryRequestId'],
                'totalAmount' => [
                    'value' => number_format((float) $donation->grand_total, 2, '.', ''),
                    'currency' => 'IDR',
                ],
                'paymentFlagStatus' => '01',
                'virtualAccountTrxType' => 'C',
                'expiredDate' => $donation->va_expired_at?->format('Y-m-d\TH:i:sP'),
            ],
        ]);
    }

    /**
     * 11.10 - 11.12: Payment VA
     * Dipanggil BANK ke server kita setelah nasabah SUDAH transfer,
     * sebagai notifikasi final pembayaran.
     */
    public function payment(Request $request, DoitpayService $doitpay)
    {
        $rawBody = $request->getContent();
        $timestamp = $request->header('X-TIMESTAMP', '');
        $signature = $request->header('X-SIGNATURE', '');
        $endpoint = '/'.ltrim($request->path(), '/');

        if (! $doitpay->verifyDirectInquirySignature('POST', $endpoint, $rawBody, $timestamp, $signature)) {
            Log::warning('Doitpay direct payment: invalid signature', ['body' => $rawBody]);

            return response()->json([
                'responseCode' => '4012500',
                'responseMessage' => 'Unauthorized Signature',
            ], 401);
        }

        $payload = $request->validate([
            'virtualAccountNo' => ['required', 'string'],
            'customerNo' => ['required', 'string'],
            'paymentRequestId' => ['required', 'string'],
            'paidAmount.value' => ['required', 'string'],
        ]);

        // 11.11 — VA tidak terdaftar
        $donation = Transaction::where('va_number', trim($payload['virtualAccountNo']))->first();

        if (! $donation) {
            return response()->json([
                'responseCode' => '4042512',
                'responseMessage' => 'Bill not found',
            ], 404);
        }

        // 11.12 — nominal tidak sesuai
        $paidAmount = (float) $payload['paidAmount']['value'];

        if (round($paidAmount, 2) !== round((float) $donation->grand_total, 2)) {
            return response()->json([
                'responseCode' => '4042513',
                'responseMessage' => 'Invalid Amount',
            ], 404);
        }

        // 11.10 — valid, tandai sukses
        $donation->update([
            'transaction_status' => 'success',
            'paid_at' => now(),
        ]);

        return response()->json([
            'responseCode' => '2002500',
            'responseMessage' => 'Successful',
            'virtualAccountData' => [
                'partnerServiceId' => $payload['customerNo'],
                'customerNo' => $donation->va_customer_no,
                'virtualAccountNo' => $donation->va_number,
                'paymentRequestId' => $payload['paymentRequestId'],
                'paidAmount' => $payload['paidAmount'],
                'virtualAccountName' => $donation->name,
            ],
        ]);
    }
}