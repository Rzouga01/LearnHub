<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Session extends Model
{
    use HasFactory;

    protected $table = 'training_sessions';

    protected $fillable = [
        'training_id',
        'title',
        'description',
        'date',
        'start_time',
        'end_time',
        'location',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * Get the training that owns the session.
     */
    public function training()
    {
        return $this->belongsTo(Training::class);
    }

    /**
     * Get the attendances for the session.
     */
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
