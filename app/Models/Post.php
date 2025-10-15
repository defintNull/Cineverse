<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'content',
        'movies',
        'group_id',
    ];

     /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'movies' => 'array'
        ];
    }

    /**
     * Get the comments of the posts
     */
    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the group owning the post
     */
    public function group() : BelongsTo {
        return $this->belongsTo(Group::class);
    }

    /**
     * Get the like linked to this post
     */
    public function likes() : MorphMany {
        return $this->morphMany(Like::class, 'likeable');
    }
}
