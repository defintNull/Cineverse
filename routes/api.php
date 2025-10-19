<?php

use App\Http\Controllers\Authentication\Login;
use App\Http\Middleware\AjaxMiddleware;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/watchlists', function () {
    //return $request->user()->watchlists;  //CON AUTH
    return response()->json(Watchlist::all()); //SENZA AUTH
}); //middleware da aggiungere :)

Route::get('/user/{id}', function (Request $request, $id) {
    // Protegge la rotta: richiede header X-App-Token che corrisponda al valore in config/services.php (es. env('APP_API_TOKEN'))
    $token = $request->header('X-App-Token');
    if (! $token || $token !== config('services.app.token')) {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $user = \App\Models\User::find($id);
    if (! $user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    return response()->json($user);
});
