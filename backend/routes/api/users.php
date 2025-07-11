<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// User routes - most require authentication
Route::middleware('auth:sanctum')->group(function() {
    // User management (admin only)
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function() {
        Route::get('users', [UserController::class, 'index']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
    });
    
    // Profile routes (for authenticated user)
    Route::get('profile', [UserController::class, 'profile']);
    Route::put('profile', [UserController::class, 'updateProfile']);
    Route::put('profile/password', [UserController::class, 'updatePassword']);
    
    // User-specific routes
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::get('users/by-role/{role}', [UserController::class, 'getByRole']);
});
