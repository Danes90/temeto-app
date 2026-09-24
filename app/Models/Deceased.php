<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deceased extends Model
{
    use HasFactory;

    protected $table = 'deceased';

    protected $fillable = [
        'grave_id',
        'name',
        'birth_date',
        'death_date',
        'notes',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'death_date' => 'date',
    ];

    public function grave(): BelongsTo
    {
        return $this->belongsTo(Grave::class);
    }
}
