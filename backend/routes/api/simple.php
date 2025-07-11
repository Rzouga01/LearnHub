<?php

use Illuminate\Support\Facades\Route;

// This is a simple test API route
Route::get('simple-test', function() {
    return response()->json(['message' => 'API route works!']);
});
