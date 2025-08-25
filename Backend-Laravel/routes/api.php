<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OprecController;

// Login + Logout routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/dasboard', [DasboardController::class, 'index']);
// });
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/rekrutmen', [OprecController::class, 'store']);
});
Route::get('/rekrutmen', [OprecController::class, 'index']);


// Route::middleware('auth:sanctum')->post('/logout-debug', function (Request $request) {
//     return response()->json([
//         'user' => $request->user(),
//         'token' => $request->bearerToken()
//     ]);
// });

// Rute untuk debugging, bisa dihapus setelah masalah selesai
Route::get('/check-file/{filename}', function ($filename) {
    $path = 'posters/' . $filename;

    if (Storage::disk('public')->exists($path)) {
        return response()->json([
            'status' => 'BERHASIL DITEMUKAN',
            'message' => "Laravel berhasil menemukan file di dalam disk 'public'. Ini artinya masalah ada di web server (Apache/Artisan Serve) yang tidak bisa mengakses symbolic link.",
            'path_yang_dicek' => $path,
            'lokasi_fisik_seharusnya' => storage_path('app/public/' . $path)
        ]);
    }

    return response()->json([
        'status' => 'TIDAK DITEMUKAN',
        'message' => "Laravel GAGAL menemukan file. Ini artinya masalah ada pada saat proses upload, file tidak tersimpan di lokasi yang benar.",
        'path_yang_dicek' => $path,
        'lokasi_fisik_seharusnya' => storage_path('app/public/' . $path)
    ], 404);
});

// sukses konek