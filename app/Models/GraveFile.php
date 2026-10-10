<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GraveFile extends Model
{
    protected $fillable = [
        'path',
        'name',
    ];
}
