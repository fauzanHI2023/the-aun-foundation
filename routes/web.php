<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Berita;
use App\Models\Program;
use App\Models\ContactMessage;
use App\Models\Campaign;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CampaignDonationController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\DoitpayNotificationController;
use App\Http\Controllers\ProgramDonationController;
use App\Http\Controllers\DonationCheckController;
use App\Http\Controllers\DoitpayVaCallbackController;
use App\Http\Controllers\DoitpayQrisCallbackController;
use App\Http\Controllers\DoitpayEwalletCallbackController;
use App\Http\Controllers\DonorDashboardController;
use Carbon\Carbon;
use App\Services\ClaudeService;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;

require __DIR__.'/donations.php';

Route::get('/', function () {
    return Inertia::render('Homepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/checkout-test', function () {
    return 'checkout ok';
});

Route::get('/aboutus', function () {
    return Inertia::render('AboutUs');
});

Route::get('/programs', function () {
    return Inertia::render('Programs');
});

Route::get('/news', function () {
    return Inertia::render('News');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

Route::get('/volunteer', function () {
    return Inertia::render('Volunteer');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DonorDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('guest')->group(function () {
    Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])
        ->name('auth.google');

    Route::get('/auth/google/callback', [GoogleController::class, 'callback'])
        ->name('auth.google.callback');
});




////////////////// Berita Route ////////////////////////////////////////

Route::get('/api/beritas', function () {
    return Berita::where('is_published', true)
        ->whereNotNull('selected_post') // 🔥 ini penting
        ->orderBy('selected_post')
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->judul,
                'slug' => $item->slug,
                'excerpt' => $item->ringkasan,
                'image' => Storage::url($item->thumbnail),
                'date' => $item->created_at?->format('d M Y'),
                'category' => $item->category,
                'home_post' => $item->home_post,
                'featured_post' => $item->featured_post,
                'selected_post' => $item->selected_post,
                'readTime' => $item->published_at?->diffForHumans(), // bisa kamu hitung nanti
            ];
        });
});

Route::get('/news/{slug}', function ($slug) {
    $item = Berita::where('slug', $slug)
        ->where('is_published', true)
        ->firstOrFail(); // 🔥 langsung 1 data

    return Inertia::render('NewsDetail', [
        'article' => [
            'id' => $item->id,
            'title' => $item->judul,
            'slug' => $item->slug,
            'excerpt' => $item->ringkasan,
            'content' => $item->konten,
            'image' => Storage::url($item->thumbnail),
            'banner' => Storage::url($item->banner),
            'date' => $item->created_at?->format('d M Y'),
            'category' => $item->category,
            'readTime' => $item->published_at?->diffForHumans(),
        ]
    ]);
});

Route::get('/api/beritas/{slug}', function ($slug) {
    return Berita::where('slug', $slug)
        ->where('is_published', true) // 🔥 ini penting
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->judul,
                'slug' => $item->slug,
                'excerpt' => $item->ringkasan,
                'image' => Storage::url($item->thumbnail),
                'date' => $item->created_at?->format('d M Y'),
                'category' => $item->category,
                'home_post' => $item->home_post,
                'featured_post' => $item->featured_post,
                'selected_post' => $item->selected_post,
                'readTime' => $item->published_at?->diffForHumans(), // bisa kamu hitung nanti
            ];
        });
});




///////////////////////////// Contact Route ////////////////////////////////

Route::post('/api/contact', function (Request $request) {
    $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'email' => 'required|email',
        'subjek' => 'nullable|string|max:255',
        'pesan' => 'required|string',
    ]);

    ContactMessage::create($validated);

    // kirim email ke admin
    Mail::to('contact@rembulanrelief.org')
        ->send(new ContactMessageMail($validated));

    return response()->json([
        'message' => 'Message sent successfully'
    ]);
});




///////////////////// Campaign Route /////////////////////////////////////////

Route::get('/api/campaigns', function () {
    return Campaign::where('is_active', true)
        ->get()
        ->map(function ($item) {
            $startDate = Carbon::parse($item->start_date);
            $endDate = Carbon::parse($item->end_date);
            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'excerpt' => $item->short_description,
                'desc' => $item->description,
                'image' => Storage::url($item->thumbnail),
                'target' => $item->target_amount,
                'collected' => $item->collected_amount,
                'startdate' => $item->start_date?->format('d M Y'),
                'enddate' => $item->end_date?->format('d M Y'),
                'daysLeft' => now()->startOfDay()->diffInDays(
                    Carbon::parse($item->end_date),
                    false
                ),
            ];
        });
});



/////////////////////////////// Search Route API /////////////////////////////////////

Route::get('/search-data', function () {
    return response()->json([
        'news' => Berita::latest()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'judul' => $item->judul,
                'konten' => strip_tags($item->konten),
                
                'category' => $item->category,
                'slug' => $item->slug,
                'thumbnail' => $item->thumbnail 
                    ? Storage::url($item->thumbnail) 
                    : null,
            ];
        }),
        'programs' => Program::latest()->get(), // kalau ada relasi
    ]);
});




////////////////////////// Cart Route //////////////////////////////////////////////

Route::get('/cart', [CartController::class, 'index']);

Route::post('/cart/add', [CartController::class, 'add']);

Route::post('/cart/update/{id}', [CartController::class, 'update']);

Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);

Route::delete('/cart/clear', [CartController::class, 'clear']);


// Campaign Route ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/campaigns', [CampaignDonationController::class, 'index'])->name('campaigns.index');
Route::get('/campaigns/{campaign:slug}', [CampaignDonationController::class, 'show'])->name('campaigns.show');
Route::get('/campaigns/{campaign:slug}/checkout', [CampaignDonationController::class, 'checkout'])->name('campaign-donations.checkout');
Route::post('/campaigns/{campaign:slug}/checkout', [CampaignDonationController::class, 'store'])->name('campaign-donations.store');
Route::get('/campaigns/{donation:invoice_number}/return', [CampaignDonationController::class, 'returnPage'])->name('campaign-donations.return');

Route::post('/v1.0/transfer-va/payment', DoitpayVaCallbackController::class)
    ->name('doitpay.va-callback')
    ->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);

Route::post('/v1.0/qr/qr-mpm-notify', DoitpayQrisCallbackController::class)
    ->name('doitpay.qris-callback')
    ->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);

Route::post('/v1.0/debit/notify', DoitpayEwalletCallbackController::class)
    ->name('doitpay.ewallet-callback')
    ->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);

Route::get('/campaigns/{donation:invoice_number}/status', function (\App\Models\Transaction $donation) {
    return response()->json([
        'status' => $donation->transaction_status,
    ]);
})->name('campaign-donations.status');

Route::post('/campaigns/{donation:invoice_number}/check-status', [CampaignDonationController::class, 'checkStatus'])
    ->name('campaign-donations.check-status');



Route::get('/donasi', [DonationController::class, 'create'])->name('donations.create');
Route::post('/donasi', [DonationController::class, 'store'])->name('donations.store');
Route::get('/donasi/{donation}/return', [DonationController::class, 'returnPage'])->name('donations.return');
Route::post('/donasi/notify', [DoitpayNotificationController::class, 'handle'])
    ->name('donations.notify')
    ->withoutMiddleware(ValidateCsrfToken::class);




//////////////   Program  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/program/{program}', [ProgramDonationController::class, 'show'])->name('programs.show');
Route::get('/program/{program}/checkout', [ProgramDonationController::class, 'checkout'])->name('program-donations.checkout');
Route::post('/program/{program}/checkout', [ProgramDonationController::class, 'store'])->name('program-donations.store');
Route::get('/program-donations/{donation}/return', [ProgramDonationController::class, 'returnPage'])->name('program-donations.return');




Route::get('/cek-donasi', [DonationCheckController::class, 'index'])->name('donation-check.index');

Route::get('/ip', function () {
    return Http::get('https://api.ipify.org')->body();
});

Route::get('/cek-curl', function () {
    return response()->json(curl_version());
});

/////////// UAT Test /////////////////////////////////
Route::get('/uat-test/{scenario}', function (string $scenario, \App\Services\DoitpayService $doitpay) {
    try {
        $result = match ($scenario) {
            // 11.1 — Access Token Invalid
            'token-invalid' => (function () use ($doitpay) {
                $reflection = new ReflectionProperty($doitpay, 'baseUrl');
                $reflection->setAccessible(true);
                $baseUrl = $reflection->getValue($doitpay);

                $response = \Illuminate\Support\Facades\Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'X-TIMESTAMP' => now()->format('Y-m-d\TH:i:sP'),
                    'X-SIGNATURE' => 'invalid-signature-sengaja',
                    'X-PARTNER-ID' => config('doitpay.merchant_ref'),
                    'X-EXTERNAL-ID' => (string) \Illuminate\Support\Str::uuid(),
                    'CHANNEL-ID' => 'DOITPAY',
                    'Authorization' => 'Bearer token-yang-sengaja-invalid-123',
                ])->post("{$baseUrl}/va/v1.0/transfer-va/create-va", [
                    'partnerServiceId' => '1020002',
                    'customerNo' => '123456',
                    'virtualAccountNo' => '',
                    'virtualAccountName' => 'Test UAT',
                    'trxId' => 'UAT-TOKEN-' . time(),
                    'totalAmount' => ['value' => '10000.00', 'currency' => 'IDR'],
                    'virtualAccountTrxType' => 'C',
                    'expiredDate' => now()->addMinutes(30)->format('Y-m-d\TH:i:sP'),
                ]);

                return $response->json();
            })(),

            // 11.4 — Invalid Field Format (kirim amount.value sebagai angka, bukan string)
            'invalid-format' => (function () use ($doitpay) {
                $reflection = new ReflectionMethod($doitpay, 'post');
                $reflection->setAccessible(true);

                return $reflection->invoke($doitpay, '/va/v1.0/transfer-va/create-va', [
                    'partnerServiceId' => '1020002',
                    'customerNo' => '123456',
                    'virtualAccountNo' => '',
                    'virtualAccountName' => 'Test UAT',
                    'trxId' => 'UAT-FORMAT-' . time(),
                    'totalAmount' => ['value' => 10000, 'currency' => 'IDR'], // <- sengaja integer, bukan string "10000.00"
                    'virtualAccountTrxType' => 'C',
                    'expiredDate' => now()->addMinutes(30)->format('Y-m-d\TH:i:sP'),
                ]);
            })(),

            // 11.5 — Duplicate X-EXTERNAL-ID (kirim 2x dengan X-EXTERNAL-ID identik)
            'duplicate-external-id' => (function () use ($doitpay) {
                $fixedExternalId = 'UAT-FIXED-EXTERNAL-ID-001';
                $reflection = new ReflectionProperty($doitpay, 'baseUrl');
                $reflection->setAccessible(true);
                $baseUrl = $reflection->getValue($doitpay);

                $accessToken = $doitpay->getAccessToken();
                $body = [
                    'partnerServiceId' => '1020002',
                    'customerNo' => '123456',
                    'virtualAccountNo' => '',
                    'virtualAccountName' => 'Test UAT',
                    'trxId' => 'UAT-DUP-' . time(),
                    'totalAmount' => ['value' => '10000.00', 'currency' => 'IDR'],
                    'virtualAccountTrxType' => 'C',
                    'expiredDate' => now()->addMinutes(30)->format('Y-m-d\TH:i:sP'),
                ];
                $rawJsonBody = json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                $timestamp = now()->format('Y-m-d\TH:i:sP');

                $signatureMethod = new ReflectionMethod($doitpay, 'symmetricSignature');
                $signatureMethod->setAccessible(true);
                $signature = $signatureMethod->invoke($doitpay, 'POST', '/va/v1.0/transfer-va/create-va', $accessToken, $rawJsonBody, $timestamp);

                $headers = [
                    'Content-Type' => 'application/json',
                    'X-TIMESTAMP' => $timestamp,
                    'X-SIGNATURE' => $signature,
                    'X-PARTNER-ID' => config('doitpay.merchant_ref'),
                    'X-EXTERNAL-ID' => $fixedExternalId,
                    'CHANNEL-ID' => 'DOITPAY',
                    'Authorization' => "Bearer {$accessToken}",
                ];

                $first = \Illuminate\Support\Facades\Http::withHeaders($headers)
                    ->withBody($rawJsonBody, 'application/json')
                    ->post("{$baseUrl}/va/v1.0/transfer-va/create-va");

                $second = \Illuminate\Support\Facades\Http::withHeaders($headers)
                    ->withBody($rawJsonBody, 'application/json')
                    ->post("{$baseUrl}/va/v1.0/transfer-va/create-va");

                return ['first' => $first->json(), 'second' => $second->json()];
            })(),

            default => ['error' => 'scenario tidak dikenal'],
        };

        \Illuminate\Support\Facades\Log::info('UAT TEST RESULT', ['scenario' => $scenario, 'result' => $result]);

        return response()->json($result);
    } catch (\Throwable $e) {
        \Illuminate\Support\Facades\Log::error('UAT TEST ERROR', ['scenario' => $scenario, 'message' => $e->getMessage()]);
        return response()->json(['exception' => $e->getMessage()]);
    }
});

require __DIR__.'/auth.php';
