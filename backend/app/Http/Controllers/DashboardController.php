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
     * Learner dashboard: returns stats and active enrollments for the current user.
     */
    public function studentDashboard(Request $request)
    {
        $user = $request->user();
        
        // Get enrollments with training and trainer
        $enrollments = Enrollment::with(['training.user'])
            ->where('user_id', $user->id)
            ->get();

        // Calculate learning hours from attendance
        $totalHours = Attendance::where('user_id', $user->id)
            ->where('present', true)
            ->count() * 2; // Assume 2 hours per session

        // Calculate streak (simplified - consecutive days with activity)
        $streak = $this->calculateLearningStreak($user->id);
        
        // Calculate XP and level
        $xp = $enrollments->sum('progress') * 10; // 10 XP per progress point
        $level = floor($xp / 1000) + 1; // Level up every 1000 XP
        $nextLevelXp = $level * 1000;

        // Map enrollments to frontend-friendly structure
        $activeCourses = $enrollments->map(function($enrollment) {
            $training = $enrollment->training;
            return [
                'id' => $training->id,
                'training_title' => $training->title ?? 'Untitled Course',
                'progress' => $enrollment->progress ?? 0,
                'instructor_name' => $training->user->name ?? 'Unknown',
                'rating' => $training->rating ?? 0,
                'thumbnail' => '📚',
                'color' => '#E76F51',
                'next_lesson' => 'Continue Learning',
                'lessons_left' => null
            ];
        });

        // Enhanced stats
        $stats = [
            'coursesEnrolled' => $enrollments->count(),
            'coursesCompleted' => $enrollments->where('progress', '>=', 100)->count(),
            'totalHours' => $totalHours,
            'certificates' => $enrollments->where('progress', '>=', 100)->count(),
            'streak' => $streak,
            'level' => $level,
            'xp' => $xp,
            'nextLevelXp' => $nextLevelXp
        ];

        return response()->json([
            'data' => $stats
        ]);
    }

    /**
     * Trainer dashboard: returns trainer-specific stats and data.
     */
    public function trainerDashboard(Request $request)
    {
        $user = $request->user();
        
        // Get trainings created by this trainer
        $trainings = Training::where('user_id', $user->id)->get();
        $trainingIds = $trainings->pluck('id');
        
        // Get all enrollments for trainer's courses
        $enrollments = Enrollment::whereIn('training_id', $trainingIds)->get();
        
        // Calculate stats
        $totalStudents = $enrollments->pluck('user_id')->unique()->count();
        $completedEnrollments = $enrollments->where('progress', '>=', 100)->count();
        $completionRate = $enrollments->count() > 0 ? 
            round(($completedEnrollments / $enrollments->count()) * 100, 1) : 0;
        
        // Calculate average rating
        $avgRating = $trainings->where('rating', '>', 0)->avg('rating') ?? 0;
        
        // Calculate revenue (assuming price field exists)
        $totalRevenue = $enrollments->where('payment_status', 'paid')
            ->sum(function($enrollment) {
                return $enrollment->training->price ?? 0;
            });

        // Get upcoming sessions count
        $upcomingSessions = \App\Models\Session::whereIn('training_id', $trainingIds)
            ->where('start_time', '>=', now())
            ->count();

        $stats = [
            'totalCourses' => $trainings->count(),
            'totalStudents' => $totalStudents,
            'completionRate' => $completionRate,
            'avgRating' => round($avgRating, 1),
            'upcomingSessions' => $upcomingSessions,
            'totalRevenue' => $totalRevenue
        ];

        return response()->json([
            'data' => $stats
        ]);
    }

    /**
     * Coordinator dashboard: returns coordinator-specific stats and data.
     */
    public function coordinatorDashboard(Request $request)
    {
        // Get overall system stats
        $totalTrainings = Training::count();
        $totalTrainers = User::where('role', 'trainer')->count();
        $totalLearners = User::where('role', 'student')->count();
        $activeTrainings = Training::where('end_date', '>=', now())->count();
        
        // Get pending trainer applications
        $pendingApplications = \App\Models\TrainerApplication::where('status', 'pending')->count();
        
        // Calculate overall completion rate
        $totalEnrollments = Enrollment::count();
        $completedEnrollments = Enrollment::where('progress', '>=', 100)->count();
        $completionRate = $totalEnrollments > 0 ? 
            round(($completedEnrollments / $totalEnrollments) * 100, 1) : 0;

        $stats = [
            'totalTrainings' => $totalTrainings,
            'totalTrainers' => $totalTrainers,
            'totalLearners' => $totalLearners,
            'activeTrainings' => $activeTrainings,
            'pendingApplications' => $pendingApplications,
            'completionRate' => $completionRate
        ];

        return response()->json([
            'data' => $stats
        ]);
    }

    /**
     * Calculate learning streak for a user.
     *
     * @param  int  $userId
     * @return int
     */
    private function calculateLearningStreak($userId)
    {
        // Get recent attendance records
        $recentAttendance = Attendance::where('user_id', $userId)
            ->where('present', true)
            ->orderBy('created_at', 'desc')
            ->limit(30)
            ->get();

        if ($recentAttendance->isEmpty()) {
            return 0;
        }

        // Simple streak calculation - consecutive days with activity
        $streak = 0;
        $lastDate = null;
        
        foreach ($recentAttendance as $attendance) {
            $currentDate = $attendance->created_at->format('Y-m-d');
            
            if ($lastDate === null) {
                $streak = 1;
                $lastDate = $currentDate;
            } elseif ($lastDate === $currentDate) {
                // Same day, continue
                continue;
            } elseif (strtotime($currentDate) === strtotime($lastDate) - 86400) {
                // Previous day, increment streak
                $streak++;
                $lastDate = $currentDate;
            } else {
                // Gap in streak, break
                break;
            }
        }

        return $streak;
    }

    /**
     * Get recent activity for dashboard.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getRecentActivity(Request $request)
    {
        $user = $request->user();
        
        $activities = [];
        
        // Get recent enrollments
        $recentEnrollments = Enrollment::with('training')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();
            
        foreach ($recentEnrollments as $enrollment) {
            $activities[] = [
                'id' => 'enrollment_' . $enrollment->id,
                'title' => 'Enrolled in ' . ($enrollment->training->title ?? 'Course'),
                'time' => $enrollment->created_at->diffForHumans(),
                'icon' => 'book'
            ];
        }
        
        // Get recent attendance
        $recentAttendance = Attendance::with(['session.training'])
            ->where('user_id', $user->id)
            ->where('present', true)
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get();
            
        foreach ($recentAttendance as $attendance) {
            $activities[] = [
                'id' => 'attendance_' . $attendance->id,
                'title' => 'Attended ' . ($attendance->session->training->title ?? 'Session'),
                'time' => $attendance->created_at->diffForHumans(),
                'icon' => 'check'
            ];
        }
        
        // Sort by time and limit
        usort($activities, function($a, $b) {
            return strcmp($b['time'], $a['time']);
        });
        
        return response()->json([
            'data' => array_slice($activities, 0, 5)
        ]);
    }
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
            ->where('present', true)
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
