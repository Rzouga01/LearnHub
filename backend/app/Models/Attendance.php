<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_id',
        'user_id',
        'present',
        'marked_at',
    ];

    protected $casts = [
        'present' => 'boolean',
        'marked_at' => 'datetime',
    ];

    /**
     * Get the session that owns the attendance.
     */
    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    /**
     * Get the user that owns the attendance.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
