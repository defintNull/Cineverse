<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Group $group): JsonResponse
    {
        // Restituisce la lista dei post appartenenti al gruppo specificato.
        // Carichiamo anche l'autore (solo alcuni campi) per evitare N+1.
        $posts = Post::where('group_id', $group->id)
            ->with('author:id,username,propic')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'posts' => $posts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Group $group): JsonResponse
    {
        // Validazione input.
        // Notare: non ci fidiamo del campo group_id inviato dal client perché
        // il gruppo è già passato come route-model binding ($group).
        $validated = $request->validate([
            'content' => 'required|string|max:255',
            'movies' => 'nullable|array',
            'movies.*' => 'integer',
        ]);

        // Prepara i dati del post. Salviamo l'autore corrente e l'array di movies
        // direttamente nel campo JSON (il modello Post ha il cast a array).
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $post = Post::create([
            'content' => $validated['content'],
            'group_id' => $group->id,
            'author_id' => $user->id,
            'movies' => $validated['movies'] ?? [],
        ]);

        return response()->json([
            'post' => $post,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): JsonResponse
    {
        // Restituisce il post richiesto. Carichiamo anche l'autore per comodità.
        $post->load('author:id,username,propic');

        return response()->json([
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): JsonResponse
    {
        // Validazione per update: i campi possono essere parziali.
        $validated = $request->validate([
            'content' => 'sometimes|required|string|max:255',
            'movies' => 'sometimes|nullable|array',
            'movies.*' => 'integer',
        ]);

        // Autorizzazione: solo l'autore può modificare il post.
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        if ($user->id !== $post->author_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Applichiamo solo i campi presenti nella request.
        if (array_key_exists('content', $validated)) {
            $post->content = $validated['content'];
        }
        if (array_key_exists('movies', $validated)) {
            // Se il client invia null esplicito, salviamo array vuoto.
            $post->movies = $validated['movies'] ?? [];
        }

        $post->save();

        return response()->json([
            'post' => $post,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): JsonResponse
    {
        // Il route-model binding garantisce che $post esista.
        // Controllo autorizzazione: solo autore può eliminare.
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        if ($user->id !== $post->author_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}
