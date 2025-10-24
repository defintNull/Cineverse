<?php

use App\Http\Middleware\AjaxMiddleware;
use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\Register;
use App\Http\Controllers\Portal\WatchlistController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Authentication\Profile;
use App\Http\Controllers\Portal\CommentController;
use App\Http\Controllers\Portal\GroupController;
use App\Http\Controllers\Portal\PostController;

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
Route::middleware(AjaxMiddleware::class)->name('spa.')->prefix('spa')->group(function () {
    Route::post('/login', [Login::class, 'login'])
        ->name('login');

    Route::post('/register', [Register::class, 'register'])
        ->name('register');

    /**
     * Route group for the ajax request blocked with authentication of the spa
     */
    Route::middleware('auth:sanctum')->group(function () {
        Route::name('watchlist.')->prefix('watchlist')->group(function () {
            Route::get('/index', [WatchlistController::class, "index"])
                ->name('index');
            Route::post('/update', [WatchlistController::class, 'update'])
                ->name('update');
            Route::post('/addmovie', [WatchlistController::class, 'addMovie'])
                ->name('addmovie');
            Route::post('/removemovie', [WatchlistController::class, 'removeMovie'])
                ->name('removemovie');
            Route::post('/store', [WatchlistController::class, 'store'])
                ->name('store');
        });

        Route::name('groups.')->prefix("groups")->group(function() {
            Route::get('/index', [GroupController::class, 'index'])
                ->name('index');
            Route::get('/findothergroups', [GroupController::class, 'findOtherGroups'])
                ->name('findOtherGroups');
            Route::post('join', [GroupController::class, 'join'])
                ->name('join');
            Route::post('/quit', [GroupController::class, 'quit'])
                ->name('quit');
            Route::post('/store', [GroupController::class, 'store'])
                ->name('store');
        });

        Route::middleware('auth:sanctum')->group(function(){
            Route::get('posts/{id}/comments', [CommentController::class, 'index'])
                ->name('comments.index');
            Route::post('posts/{id}/comments', [CommentController::class, 'store'])
                ->name('comments.store');
        });

        Route::name('profile.')->prefix('profileinfo')->group(function () {
            Route::get('/index', [Profile::class, 'index'])
                ->name('index');
            Route::get('/check-username/{username}', [Profile::class, 'checkUsername'])
                ->name('check-username');
            Route::get('/check-email/{email}', [Profile::class, 'checkEmail'])
                ->name('check-email');
            Route::post('/update', [Profile::class, 'update'])
                ->name('update');
        });

        Route::apiResource('groups.posts', PostController::class);
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
