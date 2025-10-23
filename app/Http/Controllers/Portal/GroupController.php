<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

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

    public function join(Request $request) :JsonResponse {
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

    public function quit(Request $request) : JsonResponse {
        $request->validate([
            'id' => ['required', 'integer', Rule::exists('groups', 'id')],
        ]);

        $group = Group::where('id', $request->id)->get()[0];

        if($group->users()->where('user_id', Auth::user()->id)->exists()) {
            $group->users()->detach(Auth::user()->id);
            if(count($group->users) == 0) {
                $this->destroy($group);
            }
            return response()->json([
                'status' => 200,
            ]);
        }

        return response()->json([
            'error' => 'Unauthorize',
        ], 401);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:64'],
            'description' => ['required', 'string', 'max:1000'],
            'visibility' => ['required', Rule::in(['public', 'private'])],
            'group_foto' => ['image', 'mimes:jpeg,jpg'],
        ]);

        // Saving the profile foto picture
        $group_foto_path = null;
        if($request->has('group_foto')) {
            $file = $request->file('group_foto');
            $time = explode(" ", microtime());
            $temp = explode(".", $time[0]);
            $time = [$temp[1], $time[1]];
            $group_foto_name = implode("_", $time)."_".$request->name.".jpg";
            $group_foto_path = "ProfilePictureFoto/".$group_foto_name;
            Storage::disk('local')->putFileAs("GroupPictureFoto/", $file, $group_foto_name);
        }

        //Creating token
        $token = Str::random(10);

        $group = Group::create([
            'name' => $request->name,
            'description' => $request->description,
            'visibility' => $request->visibility,
            'token' => $token,
            'user_id' => Auth::user()->id,
            'propic' => $group_foto_path,
        ]);

        return response()->json([
            'status' => 200,
            'group' => $group,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    private function destroy(Group $group)
    {
        $group->delete();
    }
}
