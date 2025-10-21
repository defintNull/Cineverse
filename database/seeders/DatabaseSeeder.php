<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Watchlist;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);



        User::factory()->create([
            'name' => 'Gerry',
            'surname' => 'Scotti',
            'email' => 'gerry.scotti@mediaset.it',
            'username' => 'gerry.scotti',
            'password' => bcrypt('cadutalibera!'),
            'remember_token' => Str::random(10),
            'role' => 'default',
            'status' => 1,
            'watchlistpriv' => 1,
            'theme' => 0,
            'preferredgenres' => ['Game Show', 'Reality'],
            'nationality' => 'Italy'
        ]);

        Watchlist::factory()->create([
            'name' => 'My Watchlist1',
            'movies' => [550,120],
        ]);

        Watchlist::factory()->create([
            'name' => 'My Watchlist2',
            'movies' => [550],
            'user_id' => 12,
        ]);
    }
}
