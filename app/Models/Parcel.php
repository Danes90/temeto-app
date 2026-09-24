<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Parcel extends Model
{
    use HasFactory;

    protected $fillable = [
        'cemetery_id',
        'name',
        'color',
        'points',
    ];

    protected $casts = [
        'points' => 'array',
    ];

    public function cemetery(): BelongsTo
    {
        return $this->belongsTo(Cemetery::class);
    }

    public function graves(): HasMany
    {
        return $this->hasMany(Grave::class);
    }
}
