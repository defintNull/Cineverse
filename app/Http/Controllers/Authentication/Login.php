<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Login extends Controller
{
    public function login(Request $request) : JsonResponse {
        $request->validate([
            'username' => ['required', 'string', 'max:128'],
            'password' => ['required', 'string', 'max:128'],
        ]);

        if(Auth::attempt([
            'username' => $request->username,
            'password' => $request->pasword,
            'status' => true,
        ])) {
            $request->session()->regenerate();

            return response()->json([
                'access' => 'garanted'
            ]);
        }

        return response()->json([
            'access' => 'denied'
        ]);
    }
}
