<?php

namespace App\Http\Controllers\Portal;
use App\Models\Watchlist;  //BOOOOOH
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
    $watchlist = Watchlist::findOrFail($id);  //Bisogna importare il model

    $validated = $request->validate([
        'name'   => 'required|string|max:255',
        'movies' => 'required|array', // ci aspettiamo un array
    ]);

    // Salviamo come JSON
    $watchlist->name   = $validated['name'];
    $watchlist->movies = json_encode($validated['movies']);
    $watchlist->save();

    return redirect()->route('watchlist.index')
                     ->with('success', 'Watchlist aggiornata con successo!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
