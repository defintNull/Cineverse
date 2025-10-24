<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id) : JsonResponse
    {
        $post = Post::where("id", $id)->get();
        if($post->count() != 0) {
            $post = $post[0];

            $comments = $post->comments()->with('user:id,username,propic')->paginate(20);

            if($post->group->users->contains(Auth::user()->id)) {
                foreach ($comments as $comment) {
                    $image_src = null;
                    if($comment->user->propic != null && Storage::disk('local')->exists($comment->user->propic)) {
                        $image_src = 'data:image/jpeg;base64,'.base64_encode(Storage::disk('local')->get($comment->user->propic));
                    }
                    $comment->user->propic = $image_src;
                }

                return response()->json([
                    "status" => 200,
                    'comments' => $comments,
                ]);
            }
        }

        return response()->json([
            'status' => 400,
        ], 400);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
}
