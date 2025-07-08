<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/cors-test', function() {
    return response()->json([
        'message' => 'CORS is working!',
        'status' => 'success'
    ]);
});

// Authentication routes
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('/api/logout', [AuthController::class, 'logout']);
    Route::get('/api/user', function(Request $request) {
        return $request->user();
    });
});
