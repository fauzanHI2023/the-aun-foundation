<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Donor;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    /**
     * Redirect user ke halaman consent Google.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Callback dari Google setelah user login/authorize.
     * Membuat akun baru (sign up) jika belum ada, atau login (sign in) jika sudah ada.
     */
    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Throwable $e) {
            return redirect()->route('login')
                ->with('error', 'Login dengan Google gagal, silakan coba lagi.');
        }

        $user = DB::transaction(function () use ($googleUser) {
            // Cari berdasarkan google_id ATAU email (jaga-jaga user pernah daftar manual)
            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            if ($user) {
                // Update data terbaru dari Google
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            } else {
                // Sign up otomatis
                $user = User::create([
                    'name' => $googleUser->getName() ?? $googleUser->getNickname(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => Str::password(24), // random, tidak dipakai untuk login manual
                    'role' => 'user', // WAJIB 'user', bukan 'admin' -> tidak bisa akses Filament
                    'email_verified_at' => now(),
                ]);
            }

            // Pastikan setiap user punya record Donor.
            // firstOrCreate: kalau donor untuk user_id ini sudah ada, tidak dibuat ulang.
            // Ini juga otomatis meng-cover user lama yang belum punya donor.
            Donor::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'type' => 'individual',
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            );

            return $user;
        });

        Auth::login($user, remember: true);

        // Redirect ke dashboard Inertia (bukan ke panel Filament)
        return redirect()->intended(route('dashboard', absolute: false));
    }
}