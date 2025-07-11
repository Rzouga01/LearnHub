<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of enrollments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $enrollments = Enrollment::with(['user', 'training'])->get();
        return response()->json($enrollments);
    }

    /**
     * Store a newly created enrollment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'training_id' => 'required|exists:trainings,id',
            'status' => 'required|in:pending,approved,rejected',
            'payment_status' => 'required|in:pending,paid,refunded',
        ]);

        $enrollment = Enrollment::create($validated);
        return response()->json($enrollment, 201);
    }

    /**
     * Display the specified enrollment.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $enrollment = Enrollment::with(['user', 'training'])->findOrFail($id);
        return response()->json($enrollment);
    }

    /**
     * Update the specified enrollment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $enrollment = Enrollment::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'in:pending,approved,rejected',
            'payment_status' => 'in:pending,paid,refunded',
        ]);

        $enrollment->update($validated);
        return response()->json($enrollment);
    }

    /**
     * Remove the specified enrollment from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get enrollments for a specific user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getUserEnrollments($userId)
    {
        $enrollments = Enrollment::where('user_id', $userId)
            ->with('training')
            ->get();
        return response()->json($enrollments);
    }
    
    /**
     * Get enrollments for a specific training.
     *
     * @param  int  $trainingId
     * @return \Illuminate\Http\Response
     */
    public function getTrainingEnrollments($trainingId)
    {
        $enrollments = Enrollment::where('training_id', $trainingId)
            ->with('user')
            ->get();
        return response()->json($enrollments);
    }
}
