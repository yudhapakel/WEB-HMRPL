<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::where('email', 'akreshmrpl@gmail.com')->first();

        if (! $admin) {
            User::factory()->create([
                'name' => 'Admin HMRPL',
                'email' => 'akreshmrpl@gmail.com',
                'password' => bcrypt('Akres@2025HMRPL'),
                'role' => 'admin',
            ]);

            return;
        }

        $admin->forceFill([
            'name' => 'Admin HMRPL',
            'role' => 'admin',
        ])->save();
    }
}
