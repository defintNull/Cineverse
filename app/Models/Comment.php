<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'content',
        'post_id',
    ];

    /**
     * Get the post that owns the comment
     */
    public function post() : BelongsTo {
        return $this->belongsTo(Post::class);
    }

    /**
     * Get the like linked to this comment
     */
    public function likes() : MorphMany {
        return $this->morphMany(Like::class, 'likeable');
    }
}
