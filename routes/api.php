<?php

use App\Http\Controllers\Authentication\Login;
use App\Http\Middleware\AjaxMiddleware;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
