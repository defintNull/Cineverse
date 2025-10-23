<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        $user = Auth::user();

        $groups = $user->groups;
        foreach ($groups as $group) {
            $image_src = null;
            if($group->propic != null && Storage::disk('local')->exists($group->propic)) {
                $image_src = 'data:image/jpeg;base64,'.base64_encode(Storage::disk('local')->get($group->propic));
            }
            $group->propic = $image_src;
        }

        return response()->json([
            'status' => 'OK',
            'groups' => $groups,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function findOtherGroups(Request $request) : JsonResponse
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);

        $search = "";
        if($request->has('search') && $request->search != null && $request->search != "") {
            $search = $request->search;
        }

        $user = Auth::user();

        $groups = Group::where("name", "like", $search."%")
                        ->whereNotIn('id', $user->groups->pluck('id'))
                        ->paginate(15);

        $groups = $groups->items();
        foreach ($groups as $group) {
            $image_src = null;
            if($group->propic != null && Storage::disk('local')->exists($group->propic)) {
                $image_src = 'data:image/jpeg;base64,'.base64_encode(Storage::disk('local')->get($group->propic));
            }
            $group->propic = $image_src;
        }

        return response()->json([
            'status' => 'OK',
            'search' => $request->search,
            'groups' => $groups,
        ]);
    }

    public function join(Request $request) {
        $request->validate([
            'id' => ['required', 'integer', Rule::exists('groups', 'id')],
            'token' => ['nullable', 'string'],
        ]);

        $group = Group::where('id', $request->id)->get()[0];

        if($group->visibility == 'private') {
            if(!$request->has('token') || $request->token == null) {
                return response()->json([
                    'status' => 403,
                    'error' => 'Token required',
                ]);
            } elseif($request->token != $group->token) {
                return response()->json([
                    'status' => 401,
                    'error' => 'Wrong token',
                ]);
            }
        }

        $group->users()->syncWithoutDetaching([Auth::user()->id]);

        $image_src = null;
        if($group->propic != null && Storage::disk('local')->exists($group->propic)) {
            $image_src = 'data:image/jpeg;base64,'.base64_encode(Storage::disk('local')->get($group->propic));
        }
        $group->propic = $image_src;

        return response()->json([
            'status' => 200,
            'group' => $group,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
