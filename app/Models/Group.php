<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'visibility',
        'user_id',
        'propic',
    ];

    /**
     * Get the users participating the group
     */
    public function users() : BelongsToMany {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get the posts of the group
     */
    public function posts() : HasMany {
        return $this->hasMany(Post::class);
    }
}
