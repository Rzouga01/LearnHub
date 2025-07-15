<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainerApplication extends Model
{
    protected $fillable = [
        'first_name',
        'last_name', 
        'email',
        'phone',
        'current_position',
        'company',
        'primary_expertise',
        'years_experience',
        'secondary_expertise',
        'professional_bio',
        'teaching_experience',
        'preferred_format',
        'courses_want_to_teach',
        'why_teach',
        'resume_path',
        'certification_paths',
        'portfolio_paths',
        'status',
        'notes',
        'reviewed_by',
        'reviewed_at'
    ];

    protected $casts = [
        'secondary_expertise' => 'array',
        'certification_paths' => 'array',
        'portfolio_paths' => 'array',
        'reviewed_at' => 'datetime'
    ];

    // Relationships
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Accessors
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getStatusBadgeAttribute(): array
    {
        return match($this->status) {
            'pending' => ['color' => 'orange', 'text' => 'Pending Review'],
            'under_review' => ['color' => 'blue', 'text' => 'Under Review'],
            'interview_scheduled' => ['color' => 'purple', 'text' => 'Interview Scheduled'],
            'approved' => ['color' => 'green', 'text' => 'Approved'],
            'rejected' => ['color' => 'red', 'text' => 'Rejected'],
            default => ['color' => 'gray', 'text' => 'Unknown']
        };
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeUnderReview($query)
    {
        return $query->where('status', 'under_review');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}
