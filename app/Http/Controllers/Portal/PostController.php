<?php

namespace App\Http\Controllers\Portal;

use App\Models\Group;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * Controller per la gestione dei Post all'interno dei gruppi.
     * Metodi disponibili:
     * - index: lista dei post di un gruppo (controlla membership)
     * - store: crea un post per un gruppo (salva author_id e movies come JSON)
     * - show: mostra un singolo post (carica l'autore)
     * - update: aggiorna content/movies (solo autore)
     * - destroy: elimina il post (solo autore)
     *
     * Nota: i controlli di autorizzazione sono implementati manualmente qui
     * (controllo Auth::user() e membership). In progetti più grandi è preferibile
     * usare Policies di Laravel.
     */
    /**
     * Display a listing of the resource.
     */
    public function index(Group $group): JsonResponse
    {
        // Restituisce la lista dei post appartenenti al gruppo specificato.
        // Carichiamo anche l'autore (solo alcuni campi) per evitare N+1.
        if (!$group) {
            return response()->json(['error' => 'Group not found'], 404);
        }

        // Verifica che l'utente faccia parte del gruppo (membership)
        // Qui si assume che la relazione groups sia già caricabile in memoria
        // (es. tramite eager loading nel middleware) oppure venga richiesta ora.
        if (!Auth::user()->groups->contains($group)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $posts = Post::where('group_id', $group->id)
            ->with('author:id,username,propic')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $posts = $posts->items();

        foreach ($posts as $post) {
            $image_src = null;
            if($post->author->propic != null && Storage::disk('local')->exists($post->author->propic)) {
                $image_src = 'data:image/jpeg;base64,'.base64_encode(Storage::disk('local')->get($post->author->propic));
            }
            $post->author->propic = $image_src;
        }

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
            'title' => 'required|string|max:128',
            'movies' => 'nullable|array',
            'movies.*' => 'integer',
        ]);

        // Controllo di membership: se l'utente non appartiene al gruppo non può postare
        if (!Auth::user()->groups->contains($group->id)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $post = Post::create([
            'content' => $validated['content'],
            'title' => $validated['title'],
            'group_id' => $group->id,
            'author_id' => Auth::user()->id,
            'movies' => $validated['movies'] ?? [],
        ]);

        $post->load('author:id,username,propic');

        $image_src = null;
        if ($post->author->propic && Storage::disk('local')->exists($post->author->propic)) {
            $image_src = 'data:image/jpeg;base64,' . base64_encode(Storage::disk('local')->get($post->author->propic));
        }
        $post->author->propic = $image_src;

        return response()->json([
            'post' => $post,
        ], 200);
    }
}
