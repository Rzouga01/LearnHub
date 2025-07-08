<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Use a closure to check if routes are loading at all
Route::get('hello', function() {
    return response()->json(['message' => 'Hello World!']);
});

// Define controller routes directly without any special formatting
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', function(Request $request) {
        return $request->user();
    });
});
