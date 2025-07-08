<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'subject',
        'user_id',
    ];

    /**
     * Get the user that owns the training.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the sessions for the training.
     */
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    /**
     * Get the enrollments for the training.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    /**
     * Get the resources for the training.
     */
    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    /**
     * Get the feedback for the training.
     */
    public function feedback()
    {
        return $this->hasMany(Feedback::class);
    }
}
