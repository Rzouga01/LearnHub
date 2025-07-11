<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resource;

class ResourceController extends Controller
{
    /**
     * Display a listing of resources.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resources = Resource::with('training')->get();
        return response()->json($resources);
    }

    /**
     * Store a newly created resource in storage.
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
            'type' => 'required|in:document,video,link',
            'url' => 'required|string',
        ]);

        $resource = Resource::create($validated);
        return response()->json($resource, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $resource = Resource::with('training')->findOrFail($id);
        return response()->json($resource);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $resource = Resource::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'type' => 'in:document,video,link',
            'url' => 'string',
        ]);

        $resource->update($validated);
        return response()->json($resource);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $resource = Resource::findOrFail($id);
        $resource->delete();
        return response()->json(null, 204);
    }
    
    /**
     * Get resources for a specific training.
     *
     * @param  int  $trainingId
     * @return \Illuminate\Http\Response
     */
    public function getTrainingResources($trainingId)
    {
        $resources = Resource::where('training_id', $trainingId)->get();
        return response()->json($resources);
    }
}
