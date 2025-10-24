<?php

namespace App\Http\Controllers\Portal;
use App\Models\Watchlist;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\User;

class WatchlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'watchlists'=>$user->watchlists,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $user = Auth::user();

        // Check for existing names
        $existingNames = $user->watchlists()->where('name', 'like', "My Watchlist%")->pluck('name');
        $usedNumbers = [];
        foreach ($existingNames as $name) {
            if (preg_match('/^My Watchlist(\d+)$/', $name, $matches)) {
                $usedNumbers[] = (int) $matches[1];
            }
        }
        $number = 1;
        while (in_array($number, $usedNumbers)) {
            $number++;
        }

        $watchlist = Watchlist::create([
            'name'    => "My Watchlist".$number,
            'content'  => [],
            'user_id' => $user->id,
        ]);

        return response()->json([
            'watchlist' => $watchlist,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */

    //DA VEDERE DOPO perchè lo userò con il rename della watchlist

    public function update(Request $request) : JsonResponse
    {
        $request->validate([
            'watchlist_id' => ['required', 'integer', Rule::exists('watchlists', 'id')],
            'name' => ['required', 'string', "max:255"],
        ]);

        $watchlist = Watchlist::where('id', $request->watchlist_id)->get()[0];
        $user = Auth::user();

        if($watchlist->user->id == Auth::user()->id && $user->watchlists()->where('name', $request->name)->get()->count() == 0) {
            $watchlist->name = $request->name;
            $watchlist->save();

            return response()->json([
                'status' => 200,
                'watchlist' => $watchlist,
            ]);
        }

        return response()->json([
            'error' => 'Failed to update watchlist.'
        ], 400);
    }



    //Si aggiunge un film alla lista
    public function addElement(Request $request) : JsonResponse
    {
        $request->validate([
            'watchlist' => ['required','integer',Rule::exists('Watchlists','id')],
            'type' => ['required', Rule::in(['Movie', 'Serie'])],
            'element_id' => ['required','integer'],
        ]);

        $watchlist = Watchlist::where('id', $request->watchlist)->get()[0];
        if($watchlist->user->id == Auth::user()->id) {
            $content = $watchlist->content ?? [];
            $content[] = [
                'type' => $request->type,
                'id' => $request->element_id,
            ];
            $watchlist->content = $content;
            $watchlist->save();

            return response()->json([
                'status' => 200,
            ]);
        }

        return response()->json([
            'status' => 401,
            'error' => 'Unauthorized',
        ], 401);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) : JsonResponse
    {
        $request->validate([
            'watchlist_id' => ['required', 'integer', Rule::exists('watchlists', 'id')],
        ]);

        $watchlist = Watchlist::where('id', $request->watchlist_id)->get()[0];
        $watchlist->delete();

        return response()->json([
            'status' => 200,
        ]);
    }

    public function remove(Request $request) : JsonResponse {
        $request->validate([
            'watchlist_id' => ['required', 'integer', Rule::exists('watchlists', 'id')],
            'type' => ['required', Rule::in(['Movie', 'Serie'])],
            'element_id' => ['required', 'integer'],
        ]);

        $watchlist = Watchlist::where('id', $request->watchlist_id)->get()[0];

        if($watchlist->user->id == Auth::user()->id) {
            $type = $request->type;
            $id = $request->element_id;
            $content = $watchlist->content;

            $content = array_filter($content, function ($item) use ($type, $id) {
                return !($item['type'] == $type && $item['id'] == $id);
            });

            $content = array_values($content);

            // Salva l’array aggiornato
            $watchlist->content = $content;
            $watchlist->save();

            return response()->json([
                'status' => 200,
            ]);
        }

        return response()->json([
            'status' => 400,
            'error' => 'Unauthorized',
        ], 400);
    }
}
