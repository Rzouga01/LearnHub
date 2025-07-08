<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
    
Route::get('/api/cors-test', function() {
    return response()->json([
        'message' => 'CORS is working!',
        'status' => 'success'
    ]);
});
