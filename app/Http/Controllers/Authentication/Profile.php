<?php
namespace App\Http\Controllers\Authentication;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Profile extends Controller
{
    /**
     * Manage the profile data fetching for the spa application
     */
    public function index(Request $request) : JsonResponse {
        try {
            $user = $request->user();
            return response()->json([
                'username' => $user->username,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'nationality' => $user->nationality,
                'name' => $user->name,
                'surname' => $user->surname,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch profile data.'
            ], 500);
        }
    }
}
