<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'nationality',
        'username',
        'email',
        'password',
        'role',
        'status',
        'watchlistpriv',
        'theme',
        'preferredgenres',
        'propic',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'preferredgenres' => 'array'
        ];
    }

    /**
     * Get the roles of users
     */
    public static function getRoles() {
        return ['default', 'moderator'];
    }

    /**
     * Get the whatchlists linked to this user
     */
    public function watchlists() : HasMany {
        return $this->hasMany(Watchlist::class);
    }

    /**
     * Get the reports submitted by the user
     */
    public function reports() : HasMany {
        return $this->hasMany(Report::class);
    }

    /**
     * Get the reports givrn to thr user
     */
    public function own_reports() : HasMany {
        return $this->hasMany(Report::class, 'reported_user_id');
    }

    /**
     * Get the groups where the user participate
     */
    public function groups() : BelongsToMany {
        return $this->belongsToMany(Group::class);
    }

    /**
     * Get the like of the user
     */
    public function likes() : HasMany {
        return $this->hasMany(Like::class);
    }

    /**
     * Retrieve the posts of the user
     */
    public function posts() : HasMany {
        return $this->hasMany(Post::class);
    }

    /**
     * Retrieve the comments of the user
     */
    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }
}
