<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrainingController;

// Training routes
Route::get('trainings', [TrainingController::class, 'index']);
Route::get('trainings/{id}', [TrainingController::class, 'show']);

// Protected training routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('trainings', [TrainingController::class, 'store']);
    Route::put('trainings/{id}', [TrainingController::class, 'update']);
    Route::delete('trainings/{id}', [TrainingController::class, 'destroy']);
});
