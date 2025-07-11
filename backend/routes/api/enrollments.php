<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnrollmentController;

// Enrollment routes - all require authentication
Route::middleware('auth:sanctum')->group(function() {
    Route::get('enrollments', [EnrollmentController::class, 'index']);
    Route::get('enrollments/{id}', [EnrollmentController::class, 'show']);
    Route::post('enrollments', [EnrollmentController::class, 'store']);
    Route::put('enrollments/{id}', [EnrollmentController::class, 'update']);
    Route::delete('enrollments/{id}', [EnrollmentController::class, 'destroy']);
});
