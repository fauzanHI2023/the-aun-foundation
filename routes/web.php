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


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

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

require __DIR__.'/auth.php';
