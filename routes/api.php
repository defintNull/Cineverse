<?php

use App\Http\Controllers\Authentication\Login;
use App\Http\Middleware\AjaxMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [Login::class, 'login'])
    ->middleware(AjaxMiddleware::class)
    ->name('login');

Route::middleware(['auth:sanctum', AjaxMiddleware::class])->name('api.')->prefix('api')->group(function() {

});
