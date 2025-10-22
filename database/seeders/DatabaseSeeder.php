<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\User;
use App\Models\Watchlist;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //reminder, usare il comando
        //php artisan migrate:fresh --seed
        //droppa tutto,remigra e riesegue i seeder

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

        User::factory()->create([
            'name' => 'Andrea',
            'surname' => 'Di Simone',
            'email' => 'gerry.scotti2@mediaset.it',
            'username' => 'andrea.disimone',
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
            'content' => [
            [ 'type' => 'Movie', 'id' => 550 ],
            [ 'type' => 'Serie', 'id' => 108 ],
            ],
            'user_id' => 12,
        ]);

        Watchlist::factory()->create([
            'name' => 'My Watchlist2',
            'content' => [
            [ 'type' => 'Movie', 'id' => 550 ],
            [ 'type' => 'Serie', 'id' => 107 ],
            ],
            'user_id' => 12,
        ]);

        Group::factory()->create([
            'name' => 'Cinephiles United',
            'description' => 'A group for movie enthusiasts to share reviews and recommendations.',
        ]);

        Post::factory()->create([
            'content' => 'Hello World!',
            'group_id' => 1,
            'author_id' => 12,
            'movies' => [ 550, 120],
        ]);

        Post::factory()->create([
            'content' => 'Second Post',
            'group_id' => 1,
            'author_id' => 1,
            'movies' => null,
        ]);

        // assegnazione membri ai gruppi
        $group = Group::first();

        if ($group) {
            $specificUserIds = [1, 12]; // utenti creati esplicitamente sopra
            $randomUserIds = User::whereNotIn('id', $specificUserIds)
                                 ->inRandomOrder()
                                 ->take(3)
                                 ->pluck('id')
                                 ->toArray();

            $group->users()->syncWithoutDetaching(array_merge($specificUserIds, $randomUserIds));
        }

        // crea un secondo gruppo e assegna membri casuali
        $secondGroup = Group::factory()->create([
            'name' => 'Weekend Watchers',
            'description' => 'Casual weekend movie club.',
        ]);

        $secondGroup->users()->syncWithoutDetaching(
            User::inRandomOrder()->take(4)->pluck('id')->toArray()
        );

        Post::factory(30)->create();
    }
}
