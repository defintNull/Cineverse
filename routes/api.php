<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// use App\Http\Controllers\Api\MovieController;

// // Movies endpoints used by the frontend
// Route::get('/movies/popular', [MovieController::class, 'popular']);
// Route::get('/movies/watched', [MovieController::class, 'watched']);
