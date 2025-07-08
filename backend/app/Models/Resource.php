<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_id',
        'title',
        'type',
        'size',
        'file_path',
    ];

    /**
     * Get the training that owns the resource.
     */
    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
