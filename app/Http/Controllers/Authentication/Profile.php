<?php
namespace App\Http\Controllers\Authentication;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Profile extends Controller
{
    /**
     * Manage the profile data fetching for the spa application
     */
    public function index(Request $request) : JsonResponse {
        try {
            $user = Auth::user();
            return response()->json([
                'username' => $user->username,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'nationality' => $user->nationality,
                'name' => $user->name,
                'surname' => $user->surname,
                'theme' => $user->theme,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch profile data.'
            ], 500);
        }
    }
    public function update(Request $request) : JsonResponse {
        try {
            $user = Auth::user();
            // ensure we operate on the Eloquent User model so update() is available
            $userModel = User::find($user->id);
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'nationality' => 'required|string|max:255',
                'theme' => 'required|boolean|max:1',
                'email' => 'required|email|max:255|unique:users,email,' . $user->id,
                'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            ]);
            $userModel->update($validatedData);
            return response()->json([
                'message' => 'Profile updated successfully.',
                'theme' => $userModel->theme,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update profile data.'
            ], 500);
        }
    }

    /**
     * Check if a username is available for use by other users.
     * Returns { available: true } when no other user uses the same username,
     * allowing the current authenticated user to keep their username.
     */
    public function checkUsername(Request $request) : JsonResponse {
        try {
            $username = $request->query('username');
            if (!$username) {
                return response()->json(['error' => 'Missing username parameter.'], 400);
            }

            $user = Auth::user();

            $query = User::where('username', $username);
            if ($user) {
                // exclude current user from the check so they can keep their username
                $query->where('id', '!=', $user->id);
            }

            $exists = $query->exists();

            return response()->json([ 'available' => !$exists ]);
        } catch (\Exception $e) {
            return response()->json([ 'error' => 'Failed to check username.' ], 500);
        }
    }

}
