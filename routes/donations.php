<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\DoitpayNotificationController;
use Illuminate\Support\Facades\Route;

Route::get('/donasi', [DonationController::class, 'create'])->name('donations.create');
Route::post('/donasi', [DonationController::class, 'store'])->name('donations.store');
Route::get('/donasi/{donation}/return', [DonationController::class, 'returnPage'])->name('donations.return');

Route::post('/donasi/notify', [DoitpayNotificationController::class, 'handle'])->name('donations.notify');