<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SessionController;

// Public session routes
Route::get('sessions', [SessionController::class, 'index']);
Route::get('sessions/{id}', [SessionController::class, 'show']);

// Protected session routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('sessions', [SessionController::class, 'store']);
    Route::put('sessions/{id}', [SessionController::class, 'update']);
    Route::delete('sessions/{id}', [SessionController::class, 'destroy']);
    
    // Additional session-specific routes
    Route::get('sessions/by-training/{trainingId}', [SessionController::class, 'getByTraining']);
    Route::get('sessions/upcoming', [SessionController::class, 'getUpcoming']);
    Route::post('sessions/{id}/start', [SessionController::class, 'startSession']);
    Route::post('sessions/{id}/end', [SessionController::class, 'endSession']);
});
