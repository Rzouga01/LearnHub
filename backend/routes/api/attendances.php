<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AttendanceController;

// Public attendance routes
Route::get('attendances', [AttendanceController::class, 'index']);
Route::get('attendances/{id}', [AttendanceController::class, 'show']);

// Protected attendance routes
Route::middleware('auth:sanctum')->group(function() {
    Route::post('attendances', [AttendanceController::class, 'store']);
    Route::put('attendances/{id}', [AttendanceController::class, 'update']);
    Route::delete('attendances/{id}', [AttendanceController::class, 'destroy']);
    
    // Additional attendance-specific routes
    Route::post('attendances/mark-present', [AttendanceController::class, 'markPresent']);
    Route::get('attendances/by-session/{sessionId}', [AttendanceController::class, 'getBySession']);
    Route::get('attendances/by-user/{userId}', [AttendanceController::class, 'getByUser']);
});
