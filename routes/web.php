<?php

use App\Http\Middleware\AjaxMiddleware;
use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\Register;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/**
 * Main route of the spa
 */
Route::get('/', function () {
    return view('home');
})->name('main');

/**
 * Debug route for testing
 */
// Route::get('/debug', [Login::class, 'debug']);

/**
 * Route group for the ajax request of the spa
 */
Route::middleware(AjaxMiddleware::class)->name('spa.')->prefix('spa')->group(function() {
    Route::post('/login', [Login::class, 'login'])
        ->name('login');

    Route::post('/register', [Register::class, 'register'])
        ->name('register');

    /**
     * Route group for the ajax request blocked with authentication of the spa
     */
    Route::middleware('auth:sanctum')->group(function() {

    });
});

/**
 * Collection route for the spa that redirect all the unwanted route to the main route
 */
Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');


Route::get('/welcome', function () {
    return view('welcome');
});
