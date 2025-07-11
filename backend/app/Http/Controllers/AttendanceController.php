<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendances.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $attendances = Attendance::with(['user', 'session'])->get();
        return response()->json($attendances);
    }

    /**
     * Store a newly created attendance in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'session_id' => 'required|exists:sessions,id',
            'status' => 'required|in:present,absent,excused',
            'check_in_time' => 'nullable|date',
            'check_out_time' => 'nullable|date|after:check_in_time',
        ]);

        $attendance = Attendance::create($validated);
        return response()->json($attendance, 201);
    }

    /**
     * Display the specified attendance.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $attendance = Attendance::with(['user', 'session'])->findOrFail($id);
        return response()->json($attendance);
    }

    /**
     * Update the specified attendance in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'in:present,absent,excused',
            'check_in_time' => 'nullable|date',
            'check_out_time' => 'nullable|date|after:check_in_time',
        ]);

        $attendance->update($validated);
        return response()->json($attendance);
    }

    /**
     * Remove the specified attendance from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get attendance records for a specific session.
     *
     * @param  int  $sessionId
     * @return \Illuminate\Http\Response
     */
    public function getSessionAttendance($sessionId)
    {
        $attendances = Attendance::where('session_id', $sessionId)
            ->with('user')
            ->get();
        return response()->json($attendances);
    }
    
    /**
     * Get attendance history for a specific user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getUserAttendance($userId)
    {
        $attendances = Attendance::where('user_id', $userId)
            ->with('session')
            ->get();
        return response()->json($attendances);
    }
}
