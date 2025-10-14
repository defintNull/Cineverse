<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Like extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type',
    ];

    /**
     * Get the user owning the like
     */
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the polimorphic model owning the like (comment or post)
     */
    public function likeable() : MorphTo {
        return $this->morphTo();
    }
}
