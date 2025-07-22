<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;

class TrainingController extends Controller
{
    /**
     * Display a listing of trainings.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trainings = Training::with('user')->get()->map(function ($training) {
            return [
                'id' => $training->id,
                'title' => $training->title,
                'description' => $training->description,
                'subject' => $training->subject,
                'category' => $training->subject, // Use subject as category
                'level' => 'Intermediate', // Default level
                'trainer' => $training->user->name ?? 'Unknown',
                'trainer_name' => $training->user->name ?? 'Unknown',
                'students' => $training->enrollments()->count(),
                'duration' => '12 hours', // Default duration
                'price' => $training->price ? '$' . number_format($training->price, 2) : 'Free',
                'status' => 'Active', // Default status
                'rating' => $training->rating ?? 0,
                'thumbnail' => '📚',
                'start_date' => $training->start_date,
                'end_date' => $training->end_date,
                'user_id' => $training->user_id,
                'created_at' => $training->created_at,
                'updated_at' => $training->updated_at,
            ];
        });
        
        return response()->json([
            'data' => $trainings
        ]);
    }

    /**
     * Store a newly created training in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'subject' => 'required|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'price' => 'nullable|numeric|min:0',
        ]);

        $validated['user_id'] = auth()->id();
        
        $training = Training::create($validated);
        return response()->json($training, 201);
    }

    /**
     * Display the specified training.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $training = Training::with('user')->findOrFail($id);
        return response()->json($training);
    }

    /**
     * Update the specified training in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $training = Training::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'subject' => 'string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'price' => 'nullable|numeric|min:0',
        ]);

        $training->update($validated);
        return response()->json($training);
    }

    /**
     * Remove the specified training from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $training = Training::findOrFail($id);
        $training->delete();
        return response()->json(null, 204);
    }
}