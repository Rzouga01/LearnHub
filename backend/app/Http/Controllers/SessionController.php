<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Session;

class SessionController extends Controller
{
    /**
     * Display a listing of sessions.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sessions = Session::with('training')->get();
        return response()->json($sessions);
    }

    /**
     * Store a newly created session in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'training_id' => 'required|exists:trainings,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'nullable|string|max:255',
        ]);

        $session = Session::create($validated);
        return response()->json($session, 201);
    }

    /**
     * Display the specified session.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $session = Session::with('training')->findOrFail($id);
        return response()->json($session);
    }

    /**
     * Update the specified session in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $session = Session::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'date',
            'end_time' => 'date|after:start_time',
            'location' => 'nullable|string|max:255',
        ]);

        $session->update($validated);
        return response()->json($session);
    }

    /**
     * Remove the specified session from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $session = Session::findOrFail($id);
        $session->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get sessions for a specific training.
     *
     * @param  int  $trainingId
     * @return \Illuminate\Http\Response
     */
    public function getTrainingSessions($trainingId)
    {
        $sessions = Session::where('training_id', $trainingId)->get();
        return response()->json($sessions);
    }
}
