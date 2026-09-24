<?php

namespace Database\Seeders;

use App\Models\Cemetery;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $superAdmin = User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'role' => 'super_admin',
        ]);

        $editor = User::factory()->create([
            'name' => 'Kiss János',
            'email' => 'editor@example.com',
            'role' => 'editor',
        ]);

        $cemeteryA = Cemetery::create([
            'name' => 'Budapesti Köztemető',
            'slug' => 'budapesti-koztemeto',
            'city' => 'Budapest',
            'is_active' => true,
        ]);

        $cemeteryB = Cemetery::create([
            'name' => 'Szegedi Belvárosi Temető',
            'slug' => 'szegedi-belvarosi-temeto',
            'city' => 'Szeged',
            'is_active' => true,
        ]);

        $cemeteryC = Cemetery::create([
            'name' => 'Debreceni Köztemető',
            'slug' => 'debreceni-koztemeto',
            'city' => 'Debrecen',
            'is_active' => true,
        ]);

        // Az "editor" user csak 2 temetőhöz kap hozzáférést (many-to-many)
        $editor->cemeteries()->attach([$cemeteryA->id, $cemeteryB->id]);

        // A super admin-hoz nem kell pivot rekord — ő a User::isSuperAdmin()
        // logika alapján automatikusan mindenhez (így a Debreceni Köztemetőhöz is) hozzáfér.

        // Demó parcella + sír + elhunyt, hogy a React-Konva térkép ne legyen üres.
        $parcel = $cemeteryA->parcels()->create([
            'name' => 'A parcella',
            'color' => '#4caf50',
            'points' => [
                ['x' => 100, 'y' => 100],
                ['x' => 400, 'y' => 100],
                ['x' => 400, 'y' => 300],
                ['x' => 100, 'y' => 300],
            ],
        ]);

        $grave = $parcel->graves()->create([
            'label' => 'A-01',
            'x' => 130,
            'y' => 130,
            'width' => 60,
            'height' => 120,
            'rotation' => 0,
        ]);

        $grave->deceased()->create([
            'name' => 'Kovács István',
            'birth_date' => '1945-03-12',
            'death_date' => '2020-11-02',
        ]);

        $this->command->info('Super admin: superadmin@example.com / password');
        $this->command->info('Editor: editor@example.com / password');
    }
}
