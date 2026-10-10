<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GraveType extends Model
{
    protected $fillable = [
        'name',
        'description'        
    ];

    public function grave():BelongsTo{
        return $this->belongsTo(Grave::class);
    }
}
