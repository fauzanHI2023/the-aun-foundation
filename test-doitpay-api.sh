#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# ISI DULU 4 VARIABEL INI SESUAI .env ANDA
# ============================================================
BASE_URL="https://sandbox.doitpay.co"
CLIENT_KEY=01KWK4FCK681FNJZPDND46QQ77
MERCHANT_REF=01KWK4Z2KMM93RAZKTHSNBVD95
PRIVATE_KEY_PATH="/Volumes/Local Disk D/Fullstack Project/aunfoundation/storage/app/doitpay/rsa_private_key.pem"
# ============================================================

echo "=== 0. Cek base URL bisa diakses ==="
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" "$BASE_URL" || echo "GAGAL connect ke $BASE_URL"
echo

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "Timestamp: $TIMESTAMP"

echo
echo "=== 1. Get Access Token (asymmetric RSA signature) ==="
STRING_TO_SIGN="${CLIENT_KEY}|${TIMESTAMP}"
SIGNATURE=$(printf '%s' "$STRING_TO_SIGN" | openssl dgst -sha256 -sign "$PRIVATE_KEY_PATH" | base64 | tr -d '\n')

TOKEN_RESPONSE=$(curl -s -i -X POST "$BASE_URL/auth/v1.0/access-token/b2b" \
  -H "Content-Type: application/json" \
  -H "X-TIMESTAMP: $TIMESTAMP" \
  -H "X-SIGNATURE: $SIGNATURE" \
  -H "X-CLIENT-KEY: $CLIENT_KEY" \
  -d '{"grantType":"client_credentials"}')

echo "$TOKEN_RESPONSE"
echo

ACCESS_TOKEN=$(echo "$TOKEN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4 || true)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "!!! Gagal ambil accessToken, stop di sini. Cek respons di atas."
  exit 1
fi

echo "Access Token didapat: ${ACCESS_TOKEN:0:20}..."
echo

echo "=== 2. Create Payment Link (symmetric HMAC signature) ==="
ENDPOINT="/payment-link/v1.0/debit/payment-host-to-host"
OFFSET=$(date +%z)
OFFSET="${OFFSET:0:3}:${OFFSET:3:2}"
TIMESTAMP2="$(date +"%Y-%m-%dT%H:%M:%S")$OFFSET"
VALID_UP_TO="$(date -v+1d +"%Y-%m-%dT%H:%M:%S")$OFFSET"

echo "$VALID_UP_TO"

BODY='{"partnerReferenceNo":"TEST-'"$(date +%s)"'","validUpTo":"'"$VALID_UP_TO"'","amount":{"currency":"IDR","value":"10000.00"},"urlParams":[{"type":"PAY_RETURN","url":"https://example.com/return","isDeeplink":"N"},{"type":"PAY_NOTIFY","url":"https://example.com/notify","isDeeplink":"N"}],"additionalInfo":{"currency":"IDR","customerName":"Test User","customerEmail":"test@example.com","items":[{"itemName":"Test Item","price":"10000","quantity":"1"}]}}'

BODY_HASH=$(printf '%s' "$BODY" | openssl dgst -sha256 -hex | awk '{print $NF}')

STRING_TO_SIGN2="POST:${ENDPOINT}:${ACCESS_TOKEN}:${BODY_HASH}:${TIMESTAMP2}"
SIGNATURE2=$(printf '%s' "$STRING_TO_SIGN2" | openssl dgst -sha512 -hmac "$CLIENT_KEY" -binary | base64)

echo "Body yang dikirim:"
echo "$BODY"
echo "BODY HASH: $BODY_HASH"
echo "=== REQUEST HEADERS ==="
echo "X-TIMESTAMP: $TIMESTAMP2"
echo "X-SIGNATURE: $SIGNATURE2"
echo "X-PARTNER-ID: $MERCHANT_REF"
echo "X-EXTERNAL-ID: test-ext-$(date +%s)"
echo "CHANNEL-ID: DOITPAY"
echo "Authorization: Bearer $ACCESS_TOKEN"
echo
echo "=== CURL COMMAND ==="
set -x
echo

curl -s -i -X POST "$BASE_URL$ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "X-TIMESTAMP: $TIMESTAMP2" \
  -H "X-SIGNATURE: $SIGNATURE2" \
  -H "X-PARTNER-ID: $MERCHANT_REF" \
  -H "X-EXTERNAL-ID: test-ext-$(date +%s)" \
  -H "CHANNEL-ID: DOITPAY" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d "$BODY"

echo
echo "=== Selesai. Baca HTTP status code & body di atas. ==="