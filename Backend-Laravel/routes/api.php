<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OprecController;
use App\Http\Controllers\AspirasiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\AwardingController;
use App\Http\Controllers\AnggotaController;

// Login + Logout routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});
// Rekrutmen routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/rekrutmen', [OprecController::class, 'store']);
});
Route::get('/rekrutmen', [OprecController::class, 'index']);

// Aspirasi routes
Route::post('/aspirasi', [AspirasiController::class, 'store']);

// Grup rute yang perlu login (untuk Admin)
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/aspirasi', [AspirasiController::class, 'index']);
});

// route berita public(user)
Route::get('/berita', [BeritaController::class, 'index']);

Route::get('/berita/terbaru', [BeritaController::class, 'latest']);

Route::get('/berita/{berita:slug}', [BeritaController::class, 'show']);

// route admin berita(wajib login)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/berita', [BeritaController::class, 'index']); // Daftar berita
    Route::post('/admin/berita', [BeritaController::class, 'store']); // Simpan berita baru
    Route::get('/admin/berita/{berita}', [BeritaController::class, 'show']); // Lihat satu berita (untuk edit)
    Route::delete('/admin/berita/{berita}', [BeritaController::class, 'destroy']); // Hapus berita

    Route::post('/admin/berita/{berita}', [BeritaController::class, 'update']);
});

// RUTE PUBLIK galeri
Route::get('/galeri', [GaleriController::class, 'index']);

// RUTE ADMIN (WAJIB LOGIN)
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/admin/galeri', [GaleriController::class, 'store']);

    Route::delete('/admin/galeri/{galeri}', [GaleriController::class, 'destroy']);
});

// RUTE PUBLIK awarding
Route::get('/awarding', [AwardingController::class, 'show']);

// RUTE ADMIN (WAJIB LOGIN)
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/admin/awarding', [AwardingController::class, 'update']);
});

// RUTE PUBLIK anggota
Route::get('/anggota', [AnggotaController::class, 'index']);

// RUTE ADMIN anggota (WAJIB LOGIN)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/anggota', [AnggotaController::class, 'store']);
    Route::post('/admin/anggota/{id}', [AnggotaController::class, 'update']);
    Route::delete('/admin/anggota/{id}', [AnggotaController::class, 'destroy']);
});


Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
        'token' => $request->bearerToken()
    ]);
});
