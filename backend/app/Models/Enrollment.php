<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'training_id',
        'status',
        'progress',
        'payment_status',
    ];

    protected $casts = [
        'progress' => 'decimal:2',
        'enrollment_date' => 'datetime',
    ];

    /**
     * Get the user that owns the enrollment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the training that owns the enrollment.
     */
    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
