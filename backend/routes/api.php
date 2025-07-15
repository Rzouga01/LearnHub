<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainerApplicationController;

Route::get('test', function() {
    return response()->json(['message' => 'API is working!']);
});


Route::group(['middleware' => ['api']], function() {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('trainer-application', [TrainerApplicationController::class, 'submit']);
});

Route::middleware('auth:sanctum')->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', function(Request $request) {
        return $request->user();
    });
    
    // Trainer Applications Management (for coordinators/admins)
    Route::middleware('role:coordinator,admin')->group(function() {
        Route::get('trainer-applications', [TrainerApplicationController::class, 'index']);
        Route::get('trainer-applications/{id}', [TrainerApplicationController::class, 'show']);
        Route::patch('trainer-applications/{id}/status', [TrainerApplicationController::class, 'updateStatus']);
    });
});

if (is_dir(__DIR__ . '/api')) {
  
    require_once __DIR__ . '/api/auth.php';
    require_once __DIR__ . '/api/trainings.php';
    require_once __DIR__ . '/api/enrollments.php';
    require_once __DIR__ . '/api/attendances.php';
    require_once __DIR__ . '/api/feedback.php';
    require_once __DIR__ . '/api/resources.php';
    require_once __DIR__ . '/api/sessions.php';
    require_once __DIR__ . '/api/users.php';
    require_once __DIR__ . '/api/dashboard.php';
    require_once __DIR__ . '/api/reports.php';
}
