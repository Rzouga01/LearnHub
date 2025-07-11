<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;

// All reporting routes require authentication
Route::middleware('auth:sanctum')->group(function() {
    // Basic reports
    Route::get('reports/attendance', [ReportController::class, 'attendanceReport']);
    Route::get('reports/enrollment', [ReportController::class, 'enrollmentReport']);
    Route::get('reports/feedback', [ReportController::class, 'feedbackReport']);
    Route::get('reports/performance', [ReportController::class, 'performanceReport']);
    
    // Export options
    Route::get('reports/export/attendance', [ReportController::class, 'exportAttendance']);
    Route::get('reports/export/enrollment', [ReportController::class, 'exportEnrollment']);
    Route::get('reports/export/feedback', [ReportController::class, 'exportFeedback']);
    
    // Custom reports (likely admin only)
    Route::middleware('role:admin')->group(function() {
        Route::post('reports/custom', [ReportController::class, 'generateCustomReport']);
    });
});
