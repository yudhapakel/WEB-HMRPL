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
Route::get('/rekrutmen/terbaru', [OprecController::class, 'index']);


// Route::middleware('auth:sanctum')->post('/logout-debug', function (Request $request) {
//     return response()->json([
//         'user' => $request->user(),
//         'token' => $request->bearerToken()
//     ]);
// });

// sukses konek