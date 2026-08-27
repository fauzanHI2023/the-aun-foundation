<?php
$body = json_encode([
    'test' => 'test',
    'urlParams' => [
        ['type' => 'PAY_RETURN', 'url' => 'http://127.0.0.1:8000/donasi/62/return'],
    ],
]);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => 'https://sandbox.doitpay.co/payment-link/v1.0/debit/payment-host-to-host',
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => $body,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "STATUS: $status\n";
echo $response . "\n";