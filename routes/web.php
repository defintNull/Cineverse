<?php

use App\Http\Middleware\AjaxMiddleware;
use App\Http\Controllers\Authentication\Login;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

// Route::get('/debug', [Login::class, 'debug']);

Route::middleware(AjaxMiddleware::class)->group(function() {
    Route::post('/login', [Login::class, 'login'])
    ->name('login');
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');


Route::get('/welcome', function () {
    return view('welcome');
});
