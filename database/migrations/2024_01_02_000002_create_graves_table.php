<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('graves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parcel_id')->constrained()->cascadeOnDelete();
            $table->string('label'); // sírszám / jel, pl. "A-01"
            // Téglalap pozíciója és mérete a parcella saját (0,0-tól induló) koordinátarendszerében
            $table->float('x');
            $table->float('y');
            $table->float('width');
            $table->float('height');
            $table->float('rotation')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('graves');
    }
};
