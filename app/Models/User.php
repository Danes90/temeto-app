<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'must_change_password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * A felhasználóhoz explicit módon hozzárendelt temetők (pivot tábla).
     * Super admin esetén ez üres is lehet — ő az accessibleCemeteries()
     * metóduson keresztül mindenhez hozzáfér.
     */
    public function cemeteries(): BelongsToMany
    {
        return $this->belongsToMany(Cemetery::class)->withTimestamps();
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    /**
     * A felhasználó számára ténylegesen elérhető temetők listája.
     * Super admin => az összes aktív temető.
     * Egyéb user => csak a hozzá rendelt (pivot) temetők.
     */
    public function accessibleCemeteries()
    {
        if ($this->isSuperAdmin()) {
            return Cemetery::query()->where('is_active', true)->orderBy('name')->get();
        }

        return $this->cemeteries()->where('is_active', true)->orderBy('name')->get();
    }

    public function canAccessCemetery(Cemetery|int $cemetery): bool
    {
        $cemeteryId = $cemetery instanceof Cemetery ? $cemetery->id : $cemetery;

        if ($this->isSuperAdmin()) {
            return Cemetery::whereKey($cemeteryId)->exists();
        }

        return $this->cemeteries()->whereKey($cemeteryId)->exists();
    }
}
