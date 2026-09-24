<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cemetery extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'city',
        'address',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * A temetőhöz hozzárendelt felhasználók (many-to-many).
     * Figyelem: a super_admin userek NEM feltétlenül szerepelnek itt a pivot
     * táblában — ők a User::isSuperAdmin() logika alapján férnek hozzá mindenhez.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    /**
     * A temető parcellái (a React-Konva térképen rajzolt poligonok).
     */
    public function parcels(): HasMany
    {
        return $this->hasMany(Parcel::class);
    }
}
