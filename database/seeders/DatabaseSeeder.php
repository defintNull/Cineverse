<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\User;
use App\Models\Watchlist;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Comment;

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

        //utente Andrea iannotti  id = 1
        User::factory()->create([
            'name' => 'Andrea',
            'surname' => 'Iannotti',
            'email' => 'andrea.iannotti@student.univaq.it',
            'username' => 'andrea.iannotti',
            'password' => bcrypt('cadutalibera!'),
            'remember_token' => Str::random(10),
            'role' => 'default',
            'status' => 1,
            'watchlistpriv' => 1,
            'theme' => 0,
            'preferredgenres' => ['Game Show', 'Reality'],
            'nationality' => 'Italy',
            'propic' => 'ProfilePictureFoto/propic1.jpg'
        ]);

        //utente Andrea Luca Di Simone id = 2
        User::factory()->create([
            'name' => 'Andrea Luca',
            'surname' => 'Di Simone',
            'email' => 'andrealuca.disimone@student.univaq.it',
            'username' => 'andrealuca.disimone',
            'password' => bcrypt('cadutalibera!'),
            'remember_token' => Str::random(10),
            'role' => 'default',
            'status' => 1,
            'watchlistpriv' => 1,
            'theme' => 0,
            'preferredgenres' => ['Game Show', 'Reality'],
            'nationality' => 'Italy',
            'propic' => 'ProfilePictureFoto/propic2.jpg'
        ]);

        //utente Lorenzo D'Angelo id = 3
        User::factory()->create([
            'name' => 'Lorenzo',
            'surname' => "D'Angelo",
            'email' => 'lorenzo.dangelo1@student.univaq.it',
            'username' => 'lorenzo.dangelo',
            'password' => bcrypt('cadutalibera!'),
            'remember_token' => Str::random(10),
            'role' => 'default',
            'status' => 1,
            'watchlistpriv' => 1,
            'theme' => 0,
            'preferredgenres' => ['Game Show', 'Reality'],
            'nationality' => 'Italy',
            'propic' => 'ProfilePictureFoto/propic4.jpg'
        ]);

        //utente prof Serafino Cicerone id = 4
        User::factory()->create([
            'name' => 'Serafino',
            'surname' => "Cicerone",
            'email' => 'serafino.cicerone@univaq.it',
            'username' => 'serafino.cicerone',
            'password' => bcrypt('frontend!'),
            'remember_token' => Str::random(10),
            'role' => 'default',
            'status' => 1,
            'watchlistpriv' => 1,
            'theme' => 0,
            'preferredgenres' => ['Comedy', 'Horror', 'Action'],
            'nationality' => 'Italy',
            'propic' => 'ProfilePictureFoto/propic6.jpg'
        ]);

        User::factory(46)->create();

        for ($i = 0; $i < 50; $i++) {
            $watchlistCount = rand(3, 5); // numero casuale di commenti per post
            for ($j = 0; $j < $watchlistCount; $j++) {
                Watchlist::factory()->create([
                'user_id' => $i,
                ]);
            }
        }

        Group::factory()->create([
            'name' => 'Cinephiles United',
            'description' => 'A group for movie enthusiasts to share reviews and recommendations.',
        ]);

        Group::factory(49)->create();

        Post::factory(150)->create();

        // assegnazione membri ai gruppi

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

        //crea commenti per i post; solo utenti iscritti al gruppo possono commentare
        Post::all()->each(function ($post) {
            if (!$post->group_id) {
                return;
            }

            $group = Group::find($post->group_id);
            if (!$group) {
                return;
            }

            $memberIds = $group->users()->pluck('users.id')->toArray();
            if (empty($memberIds)) {
                return;
            }

            $commentsCount = rand(0, 6); // numero casuale di commenti per post
            for ($i = 0; $i < $commentsCount; $i++) {
                $authorId = $memberIds[array_rand($memberIds)];
                Comment::factory()->create([
                    'post_id' => $post->id,
                    'user_id' => $authorId,
                    //'content' => 'Commento di prova ' . Str::random(8),
                    'content' => 'Commento di prova ' . fake()->realText(20, 3),
                ]);
            }
        });
    }
}
