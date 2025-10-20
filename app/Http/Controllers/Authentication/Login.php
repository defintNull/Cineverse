<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class Login extends Controller
{
    /**
     * Manage the login of the spa application setting cookies and protecting with rate-limiting
     */
    public function login(Request $request) : JsonResponse {
        $key = "login".$request->ip();
        if(RateLimiter::tooManyAttempts($key, 5)) {
            return response()->json([
                'error' => 'Too many requests!',
            ], 429);
        }
        RateLimiter::hit($key, 120);

        $request->validate([
            'username' => ['required', 'string', 'max:128'],
            'password' => ['required', 'string', 'max:128'],
        ]);

        if(Auth::attempt([
            'username' => $request->username,
            'password' => $request->password,
            'status' => true,
        ])) {
            $request->session()->regenerate();

            return response()->json([
                'access' => 'garanted',
                'theme' => Auth::user()->theme
            ]);
        }

        return response()->json([
            'access' => 'denied'
        ], 401);
    }
}
