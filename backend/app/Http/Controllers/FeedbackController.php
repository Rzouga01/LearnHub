<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    /**
     * Display a listing of feedback.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feedback = Feedback::with(['user', 'training'])->get();
        return response()->json($feedback);
    }

    /**
     * Store a newly created feedback in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'training_id' => 'required|exists:trainings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $feedback = Feedback::create($validated);
        return response()->json($feedback, 201);
    }

    /**
     * Display the specified feedback.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feedback = Feedback::with(['user', 'training'])->findOrFail($id);
        return response()->json($feedback);
    }

    /**
     * Update the specified feedback in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);
        
        $validated = $request->validate([
            'rating' => 'integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $feedback->update($validated);
        return response()->json($feedback);
    }

    /**
     * Remove the specified feedback from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get feedback for a specific training.
     *
     * @param  int  $trainingId
     * @return \Illuminate\Http\Response
     */
    public function getTrainingFeedback($trainingId)
    {
        $feedback = Feedback::where('training_id', $trainingId)
            ->with('user')
            ->get();
        return response()->json($feedback);
    }
    
    /**
     * Get feedback submitted by a specific user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getUserFeedback($userId)
    {
        $feedback = Feedback::where('user_id', $userId)
            ->with('training')
            ->get();
        return response()->json($feedback);
    }
}
