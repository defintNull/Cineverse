<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Watchlist extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'movies',
        'user_id'
    ];

     /**
     * Get the attributes that should be  cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'movies' => 'array'
        ];
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }
}
