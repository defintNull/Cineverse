<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Login extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'username' => ['required', 'string', 'max:128'],
            'password' => ['required', 'string', 'max:128'],
        ]);


    }
}
