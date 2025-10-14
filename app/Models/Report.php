<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Report extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'reason',
        'description',
        'status',
        'user_id',
        'reported_user_id',
    ];

    /**
     * Get the user that submitted the request
     */
    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user reported by the report
     */
    public function reportedUser() : BelongsTo {
        return $this->belongsTo(User::class, 'reported_user_id');
    }
}
