<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : JsonResponse
    {
        $user = Auth::user();

        return response()->json([
            'status' => 'OK',
            'groups' => $user->groups,
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

        $search = ($request->has('search') && $request->search != null && $request->search != "") ? $request->search : "";

        $user = Auth::user();

        $groups = Group::where("name", "like", $search."%")->get();

        return response()->json([
            'status' => 'OK',
            'groups' => $groups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
