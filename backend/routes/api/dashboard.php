<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

// All dashboard routes require authentication
Route::middleware('auth:sanctum')->group(function() {
    // Main dashboard data
    Route::get('dashboard', [DashboardController::class, 'index']);
    
    // Role-specific dashboard data
    Route::get('dashboard/student', [DashboardController::class, 'studentDashboard']);
    Route::get('dashboard/trainer', [DashboardController::class, 'trainerDashboard']);
    Route::get('dashboard/coordinator', [DashboardController::class, 'coordinatorDashboard']);
    Route::get('dashboard/admin', [DashboardController::class, 'adminDashboard']);
    
    // Dashboard statistics
    Route::get('dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('dashboard/upcoming', [DashboardController::class, 'getUpcoming']);
    Route::get('dashboard/recent-activity', [DashboardController::class, 'getRecentActivity']);
});
