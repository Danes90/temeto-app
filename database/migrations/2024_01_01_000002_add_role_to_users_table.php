<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // super_admin: minden temetőhöz automatikusan hozzáfér
            // admin / editor: csak a hozzárendelt (pivot) temetőkhöz
            $table->enum('role', ['super_admin', 'admin', 'editor'])
                ->default('editor')
                ->after('email');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
