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
            //'movies' => ['nullable','array'], // opzionale per ora
        ]);

        $user = Auth::user();

        $watchlist = Watchlist::create([
            'name'    => $request->name,
            'movies'  => $request->movies ?? [], // se non arriva, array vuoto
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
    /*
    public function update(Request $request) : JsonResponse
    {
        try {
            // Recuperiamo la watchlist dal model (puoi usare direttamente $w)
            $watchlist = Watchlist::findOrFail($w->id);

            // Validazione dei campi effettivamente presenti nella tabella
            $validatedData = $request->validate([
                'name'   => 'required|string|max:255',
                'movies' => 'required|array', // ci aspettiamo un array di film
            ]);

            // Aggiorniamo i campi
            $watchlist->update([
                'name'   => $validatedData['name'],
                'movies' => json_encode($validatedData['movies']), // salviamo come JSON
            ]);

            return response()->json([
                'message' => 'Watchlist updated successfully.',
                'watchlist' => $watchlist,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to update watchlist.'
            ], 500);
        }
    }

    */

    //Si aggiunge un film alla lista
    public function addMovie(Request $request) : JsonResponse
    {
        //print(var_dump($request->watchlist));
        //exit();
        $request->validate([
            'watchlist'   => ['required','integer',Rule::exists('Watchlists','id')],
            'movie' => ['required','integer'],
        ]);
        $watchlist = Watchlist::where('id',$request->watchlist)->get()[0];
        //echo($watchlist);
        //exit();
        /*
        $watchlist = Watchlist::create([
            "name"=>"bla bla ",

        ])*/
        $movies = $watchlist->movies;
        $movies[] = $request->movie;
        $watchlist->movies = $movies;
        $watchlist->save();
        return response()->json([
            'status'=>'200'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
