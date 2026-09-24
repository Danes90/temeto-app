<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('parcels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cemetery_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('color')->nullable();
            // Poligon sarokpontjai a temető-térkép koordinátarendszerében:
            // [{"x": 100, "y": 100}, {"x": 400, "y": 100}, ...]
            $table->json('points');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('parcels');
    }
};
