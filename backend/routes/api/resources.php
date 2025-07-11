<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResourceController;

// Public resource routes - allowing access to resources that may be publicly available
Route::get('resources', [ResourceController::class, 'index']);
Route::get('resources/{id}', [ResourceController::class, 'show']);
Route::get('resources/download/{id}', [ResourceController::class, 'download']);

// Protected resource routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('resources', [ResourceController::class, 'store']);
    Route::post('resources/upload', [ResourceController::class, 'upload']);
    Route::put('resources/{id}', [ResourceController::class, 'update']);
    Route::delete('resources/{id}', [ResourceController::class, 'destroy']);
    
    // Additional resource-specific routes
    Route::get('resources/by-training/{trainingId}', [ResourceController::class, 'getByTraining']);
    Route::get('resources/by-type/{type}', [ResourceController::class, 'getByType']);
});
