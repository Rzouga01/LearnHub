<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;

// Public feedback routes - might be restricted depending on your requirements
Route::get('feedback', [FeedbackController::class, 'index']);
Route::get('feedback/{id}', [FeedbackController::class, 'show']);

// Protected feedback routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('feedback', [FeedbackController::class, 'store']);
    Route::put('feedback/{id}', [FeedbackController::class, 'update']);
    Route::delete('feedback/{id}', [FeedbackController::class, 'destroy']);
    
    // Additional feedback-specific routes
    Route::get('feedback/by-training/{trainingId}', [FeedbackController::class, 'getByTraining']);
    Route::get('feedback/by-user/{userId}', [FeedbackController::class, 'getByUser']);
    Route::get('feedback/stats', [FeedbackController::class, 'getStats']);
});
