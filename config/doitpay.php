<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Doitpay Base URL
    |--------------------------------------------------------------------------
    | Sandbox : https://sandbox.doitpay.co
    | Production : https://api.doitpay.co
    */
    'base_url' => env('DOITPAY_BASE_URL', 'https://sandbox.doitpay.co'),

    /*
    |--------------------------------------------------------------------------
    | Client Key
    |--------------------------------------------------------------------------
    | Dilihat di halaman API Key pada menu Setting dashboard Doitpay.
    | Digunakan juga sebagai secretKey untuk symmetric signature (HMAC_SHA512).
    */
    'client_key' => env('DOITPAY_CLIENT_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Merchant Reference (X-PARTNER-ID)
    |--------------------------------------------------------------------------
    | Dilihat di dashboard Doitpay. Juga dipakai sebagai secretKey untuk
    | validasi signature pada callback/notifikasi pembayaran.
    */
    'merchant_ref' => env('DOITPAY_MERCHANT_REF'),

    /*
    |--------------------------------------------------------------------------
    | RSA Private Key Path
    |--------------------------------------------------------------------------
    | Private key PKCS#1 hasil generate openssl (lihat dokumentasi Authentication).
    | JANGAN commit file private key ke repository, taruh di storage/ dan
    | tambahkan ke .gitignore.
    */
    'private_key_path' => env('DOITPAY_PRIVATE_KEY_PATH', storage_path('app/doitpay/rsa_private_key.pem')),

];