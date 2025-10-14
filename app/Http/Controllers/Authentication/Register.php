<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class Register extends Controller
{
    /**
     * Manage the user registration of the spa application protecting the route with rate-limiting
     */
    public function register(Request $request) : JsonResponse {
        $key = "register".$request->ip();
        if(RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json([
                'error' => 'Too many requests!',
            ], 429);
        }
        RateLimiter::hit($key, 120);

        $request->validate([
            'name' => ['required', 'string', 'max:128'],
            'surname' => ['required', 'string', 'max:128'],
            'nationality' => ['required', 'string', 'max:128'],
            'username' => ['required', 'sting', 'max:128'],
            'password' => ['required', 'string', 'max:128', 'min:8'],
            'confirm_password' => ['required', 'string', 'max:128', 'min:8'],
        ]);

        if($request->password != $request->confirm_password) {
            return response()->json([
                'error' => 'Password and Confirm Password don\'t match!'
            ], 400);
        }

        User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'nationality' => $request->nationality,
            'username' => $request->username,
            'password' => $request->password,
        ]);

        return response()->json([
            'status' => 'OK'
        ]);
    }
}
