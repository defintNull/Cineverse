<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Exception;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class Profile extends Controller
{
    /**
     * Manage the profile data fetching for the spa application
     */
    public function index(Request $request): JsonResponse
    {
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

    /**
     * Update the profile informations
     */
    public function update(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'Unauthenticated.'], 401);
            }
            // ensure we operate on the Eloquent User model so update() is available
            $userModel = User::find($user->id);
            if (!$userModel) {
                return response()->json(['error' => 'User not found.'], 404);
            }

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'nationality' => 'required|string|max:255',
                'theme' => 'required|boolean|max:1',
                'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
                'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
                'propic' => ['image', 'mimes:jpeg,jpg']
            ]);

            // Saving the profile foto picture
            $profile_foto_picture_path = null;
            if ($request->has('propic')) {
                $file = $request->file('propic');
                $time = explode(" ", microtime());
                $temp = explode(".", $time[0]);
                $time = [$temp[1], $time[1]];
                $profile_foto_picture_name = implode("_", $time) . "_" . $request->username . ".jpg";
                $profile_foto_picture_path = "ProfilePictureFoto/" . $profile_foto_picture_name;
                Storage::disk('local')->putFileAs("ProfilePictureFoto/", $file, $profile_foto_picture_name);
            }

            if ($profile_foto_picture_path) {
                $validatedData['propic'] = $profile_foto_picture_path;
            }

            $userModel->update($validatedData);
            return response()->json([
                'message' => 'Profile updated successfully.',
                'theme' => $userModel->theme,
            ]);
        } catch (Exception $e) {
            // Log full exception for debugging
            Log::error('Profile update failed: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'error' => 'Failed to update profile data.',
                'temp' => [Auth::user()->id, $request->email]
            ], 500);
        }
    }

    /**
     * Check if a username is available for use by other users.
     * Returns { available: true } when no other user uses the same username,
     * allowing the current authenticated user to keep their username.
     */
    public function checkUsername(Request $request, $username): JsonResponse
    {
        try {
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

            return response()->json(['available' => !$exists]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to check username.'], 500);
        }
    }

    /**
     * Check if an email is available for use by other users.
     * Returns { available: true } when no other user uses the same email,
     * allowing the current authenticated user to keep their email.
     */
    public function checkEmail(Request $request, $email): JsonResponse
    {
        try {
            if (!$email) {
                return response()->json(['error' => 'Missing email parameter.'], 400);
            }

            $user = Auth::user();

            $query = User::where('email', $email);
            if ($user) {
                // exclude current user from the check so they can keep their email
                $query->where('id', '!=', $user->id);
            }

            $exists = $query->exists();

            return response()->json(['available' => !$exists]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to check email.'], 500);
        }
    }
}
