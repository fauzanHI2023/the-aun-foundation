<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DuitkuService
{
    public static function createInvoice(
        string $invoice,
        int $amount,
        string $name,
        ?string $email
    ) {
        $merchantCode = config('duitku.merchant_code');
        $merchantKey = config('duitku.merchant_key');

        $timestamp = round(microtime(true) * 1000);

        $signature = hash_hmac(
            'sha256',
            $merchantCode . $timestamp,
            $merchantKey
        );

        $payload = [
            'paymentAmount' => $amount,
            'merchantOrderId' => $invoice,
            'productDetails' => 'Donasi Campaign',
            'customerVaName' => $name,
            'email' => $email,
            'callbackUrl' => env('APP_URL') . '/duitku/callback',
            'returnUrl' => env('APP_URL') . '/checkout/success',
            'expiryPeriod' => 60,
        ];

        $url = config('duitku.is_production')
            ? 'https://api-prod.duitku.com/api/merchant/createInvoice'
            : 'https://api-sandbox.duitku.com/api/merchant/createInvoice';

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'x-duitku-merchantcode' => $merchantCode,
            'x-duitku-timestamp' => $timestamp,
            'x-duitku-signature' => $signature,
        ])->post($url, $payload);

        return [
            'status' => $response->status(),
            'body' => $response->body(),
            'json' => $response->json(),
        ];
    }
}