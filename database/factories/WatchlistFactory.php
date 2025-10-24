<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Watchlist>
 */
class WatchlistFactory extends Factory
{
    private $movieIds = [238,111,27205,157336,106646,
                    597,640,1124,680,429,
                    769,550,16869,466272,68718,
                    103,475557,1182047,13];
    private $serieIds = [1396,60059,87108,1398,60625,
                    66732,456,2190,2288,1402,
                    60574,93405,1416,76479,41727,
                    1405,1434,1408,1399,2316
                    ];
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        // Pesca 5 ID casuali dai movie
        $randomMovies = array_rand(array_flip($this->movieIds), 5);

        // Pesca 5 ID casuali dalle serie
        $randomSeries = array_rand(array_flip($this->serieIds), 5);

        // Costruisci la struttura finale
        $content = [];

        // Aggiungi i movie
        foreach ($randomMovies as $id) {
            $content[] = ['type' => 'Movie', 'id' => $id];
        }

        // Aggiungi le serie
        foreach ($randomSeries as $id) {
            $content[] = ['type' => 'Serie', 'id' => $id];
        }
        return [
            'name' => fake()->realText(20, 3),
            'content' => $content,
            //'user_id' => 12,  //qui è da ciclarci sopra
        ];
    }
}
