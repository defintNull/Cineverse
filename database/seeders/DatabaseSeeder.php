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

        // User::factory(10)->create();
        User::factory(20)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);





        Watchlist::factory()->create([
            'name' => 'My Watchlist1',
            'content' => [
                ['type' => 'Movie', 'id' => 550],
                ['type' => 'Serie', 'id' => 76479],
            ],
            'user_id' => 1,
        ]);

        Watchlist::factory()->create([
            'name' => 'My Watchlist2',
            'content' => [
                ['type' => 'Movie', 'id' => 872585],
                ['type' => 'Serie', 'id' => 1396],
            ],
            'user_id' => 1,
        ]);

        Group::factory()->create([
            'name' => 'Cinephiles United',
            'description' => 'A group for movie enthusiasts to share reviews and recommendations.',
        ]);

        Group::factory(50)->create();


        Post::factory()->create([
            'content' => 'Hello World!',
            'group_id' => 1,
            'author_id' => 12,
            'movies' => [550, 120], //come sono gestite le serie?
            //bisognerebbe cambiare il modello e le migrazioni, basta copiare
            //le watchlist
        ]);

        Post::factory()->create([
            'content' => 'Second Post',
            'group_id' => 1,
            'author_id' => 1,
            'movies' => null,
        ]);

        Post::factory(150)->create();

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

        // assegna circa 5 gruppi esistenti a ogni utente (non crearne di nuovi)
        $totalGroups = Group::count();
        if ($totalGroups > 0) {
            User::all()->each(function ($user) use ($totalGroups) {
            $num = rand(4, 6); // circa 5 gruppi
            $num = min($num, $totalGroups);
            $groupIds = Group::inRandomOrder()->take($num)->pluck('id')->toArray();
            $user->groups()->syncWithoutDetaching($groupIds);
            });
        }

        Post::factory(0)->create();
    }
}
