<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;
use App\Models\Enrollment;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     *
     * @return \Illuminate\Http\Response
     */
    public function getStats()
    {
        $stats = [
            'users_count' => User::count(),
            'trainings_count' => Training::count(),
            'enrollments_count' => Enrollment::count(),
            'active_trainings' => Training::where('end_date', '>=', now())->count(),
            'user_types' => User::select('role', DB::raw('count(*) as count'))
                ->groupBy('role')
                ->get(),
            'recent_enrollments' => Enrollment::with(['user', 'training'])
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
            'upcoming_trainings' => Training::where('start_date', '>=', now())
                ->orderBy('start_date', 'asc')
                ->limit(5)
                ->get(),
        ];
        
        return response()->json($stats);
    }
    
    /**
     * Get statistics for a specific user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getUserStats($userId)
    {
        $user = User::findOrFail($userId);
        
        $stats = [
            'user' => $user,
            'enrollments_count' => Enrollment::where('user_id', $userId)->count(),
            'attendance_rate' => $this->calculateAttendanceRate($userId),
            'upcoming_trainings' => Enrollment::where('user_id', $userId)
                ->whereHas('training', function($query) {
                    $query->where('start_date', '>=', now());
                })
                ->with('training')
                ->limit(5)
                ->get(),
            'recent_activity' => Enrollment::where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->with('training')
                ->limit(5)
                ->get(),
        ];
        
        return response()->json($stats);
    }
    
    /**
     * Calculate attendance rate for a user.
     *
     * @param  int  $userId
     * @return float
     */
    private function calculateAttendanceRate($userId)
    {
        $total = Attendance::where('user_id', $userId)->count();
        
        if ($total === 0) {
            return 0;
        }
        
        $present = Attendance::where('user_id', $userId)
            ->where('status', 'present')
            ->count();
            
        return round(($present / $total) * 100, 2);
    }
    
    /**
     * Get statistics for a specific training.
     *
     * @param  int  $trainingId
     * @return \Illuminate\Http\Response
     */
    public function getTrainingStats($trainingId)
    {
        $training = Training::findOrFail($trainingId);
        
        $totalEnrollments = Enrollment::where('training_id', $trainingId)->count();
        $enrollmentsByStatus = Enrollment::where('training_id', $trainingId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get();
            
        $stats = [
            'training' => $training,
            'total_enrollments' => $totalEnrollments,
            'enrollments_by_status' => $enrollmentsByStatus,
            'completion_rate' => $this->calculateCompletionRate($trainingId),
            'revenue' => $this->calculateTrainingRevenue($trainingId),
            'recent_enrollments' => Enrollment::where('training_id', $trainingId)
                ->with('user')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
        ];
        
        return response()->json($stats);
    }
    
    /**
     * Calculate completion rate for a training.
     *
     * @param  int  $trainingId
     * @return float
     */
    private function calculateCompletionRate($trainingId)
    {
        $total = Enrollment::where('training_id', $trainingId)->count();
        
        if ($total === 0) {
            return 0;
        }
        
        $completed = Enrollment::where('training_id', $trainingId)
            ->where('status', 'completed')
            ->count();
            
        return round(($completed / $total) * 100, 2);
    }
    
    /**
     * Calculate revenue for a training.
     *
     * @param  int  $trainingId
     * @return float
     */
    private function calculateTrainingRevenue($trainingId)
    {
        $training = Training::findOrFail($trainingId);
        
        $paidEnrollments = Enrollment::where('training_id', $trainingId)
            ->where('payment_status', 'paid')
            ->count();
            
        return $paidEnrollments * $training->price;
    }
}
