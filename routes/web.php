<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

// Route::get('/debug', function () {
//     return view('debug');
// });

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');


Route::get('/welcome', function () {
    return view('welcome');
});
