<?php

namespace App\Http\Controllers\Portal;
use App\Models\Watchlist;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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
    //AL MOMENTO POSSO CREARE SOLO LA WATCHLIST VUOTA
    public function store(Request $request)
    {
        $request->validate([
            'name'   => ['required','string','max:255'],
        ]);

        $user = Auth::user();

        $watchlist = Watchlist::create([
            'name'    => $request->name,
            'content'  => $request->content ?? [], // se non arriva, array vuoto
            'user_id' => $user->id,
        ]);

        return response()->json([
            'watchlist' => $watchlist,
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */

    //DA VEDERE DOPO perchè lo userò con il rename della watchlist

    public function update(Request $request) : JsonResponse
    {
        try {
            // Recuperiamo la watchlist dal model
            $watchlistrenaming = Watchlist::findOrFail($request->id);

            // Validazione dei campi effettivamente presenti nella tabella
            $validatedData = $request->validate([
                'name'   => 'required|string|max:255',
            ]);

            $user = Auth::user();

            $watchlistrenaming->update([
                'name'    => $request->name,
            ]);
            return response()->json([
                'message' => 'Watchlist updated successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update watchlist.'
            ], 500);
        }
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
    public function destroy(string $id)
    {
        //
    }
}
