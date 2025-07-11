<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;
use App\Models\Enrollment;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Generate enrollment report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function enrollmentReport(Request $request)
    {
        $query = Enrollment::with(['user', 'training']);
        
        // Apply filters
        if ($request->has('training_id')) {
            $query->where('training_id', $request->training_id);
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }
        
        if ($request->has('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        }
        
        if ($request->has('date_to')) {
            $query->where('created_at', '<=', $request->date_to);
        }
        
        $enrollments = $query->get();
        
        $summary = [
            'total_enrollments' => $enrollments->count(),
            'by_status' => $enrollments->groupBy('status')
                ->map(function($group) {
                    return $group->count();
                }),
            'by_payment_status' => $enrollments->groupBy('payment_status')
                ->map(function($group) {
                    return $group->count();
                }),
        ];
        
        return response()->json([
            'enrollments' => $enrollments,
            'summary' => $summary
        ]);
    }
    
    /**
     * Generate attendance report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function attendanceReport(Request $request)
    {
        $query = Attendance::with(['user', 'session', 'session.training']);
        
        // Apply filters
        if ($request->has('session_id')) {
            $query->where('session_id', $request->session_id);
        }
        
        if ($request->has('training_id')) {
            $query->whereHas('session', function($q) use ($request) {
                $q->where('training_id', $request->training_id);
            });
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('date_from')) {
            $query->whereHas('session', function($q) use ($request) {
                $q->where('start_time', '>=', $request->date_from);
            });
        }
        
        if ($request->has('date_to')) {
            $query->whereHas('session', function($q) use ($request) {
                $q->where('start_time', '<=', $request->date_to);
            });
        }
        
        $attendances = $query->get();
        
        $summary = [
            'total_records' => $attendances->count(),
            'by_status' => $attendances->groupBy('status')
                ->map(function($group) {
                    return $group->count();
                }),
            'attendance_rate' => $this->calculateOverallAttendanceRate($attendances),
        ];
        
        return response()->json([
            'attendances' => $attendances,
            'summary' => $summary
        ]);
    }
    
    /**
     * Calculate overall attendance rate.
     *
     * @param  \Illuminate\Support\Collection  $attendances
     * @return float
     */
    private function calculateOverallAttendanceRate($attendances)
    {
        if ($attendances->isEmpty()) {
            return 0;
        }
        
        $present = $attendances->where('status', 'present')->count();
        return round(($present / $attendances->count()) * 100, 2);
    }
    
    /**
     * Generate revenue report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function revenueReport(Request $request)
    {
        $query = Enrollment::with('training')
            ->where('payment_status', 'paid');
        
        // Apply filters
        if ($request->has('training_id')) {
            $query->where('training_id', $request->training_id);
        }
        
        if ($request->has('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        }
        
        if ($request->has('date_to')) {
            $query->where('created_at', '<=', $request->date_to);
        }
        
        $enrollments = $query->get();
        
        $totalRevenue = $enrollments->sum(function($enrollment) {
            return $enrollment->training->price;
        });
        
        $revenueByTraining = $enrollments->groupBy('training_id')
            ->map(function($group) {
                $training = $group->first()->training;
                return [
                    'training_id' => $training->id,
                    'title' => $training->title,
                    'enrollments' => $group->count(),
                    'revenue' => $group->count() * $training->price
                ];
            })
            ->values();
        
        $revenueByMonth = $enrollments->groupBy(function($enrollment) {
            return $enrollment->created_at->format('Y-m');
        })
        ->map(function($group, $month) {
            return [
                'month' => $month,
                'enrollments' => $group->count(),
                'revenue' => $group->sum(function($enrollment) {
                    return $enrollment->training->price;
                })
            ];
        })
        ->values();
        
        return response()->json([
            'total_revenue' => $totalRevenue,
            'revenue_by_training' => $revenueByTraining,
            'revenue_by_month' => $revenueByMonth
        ]);
    }
    
    /**
     * Generate user activity report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function userActivityReport(Request $request)
    {
        $query = User::with(['enrollments', 'attendances']);
        
        // Apply filters
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }
        
        if ($request->has('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        }
        
        if ($request->has('date_to')) {
            $query->where('created_at', '<=', $request->date_to);
        }
        
        $users = $query->get();
        
        $userData = $users->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'enrollments_count' => $user->enrollments->count(),
                'attendance_rate' => $this->calculateUserAttendanceRate($user),
                'created_at' => $user->created_at,
            ];
        });
        
        $summary = [
            'total_users' => $users->count(),
            'by_role' => $users->groupBy('role')
                ->map(function($group) {
                    return $group->count();
                }),
            'average_enrollments' => $users->isEmpty() ? 0 : 
                round($users->sum(function($user) {
                    return $user->enrollments->count();
                }) / $users->count(), 2),
        ];
        
        return response()->json([
            'users' => $userData,
            'summary' => $summary
        ]);
    }
    
    /**
     * Calculate attendance rate for a specific user.
     *
     * @param  \App\Models\User  $user
     * @return float
     */
    private function calculateUserAttendanceRate($user)
    {
        if ($user->attendances->isEmpty()) {
            return 0;
        }
        
        $present = $user->attendances->where('status', 'present')->count();
        return round(($present / $user->attendances->count()) * 100, 2);
    }
}
