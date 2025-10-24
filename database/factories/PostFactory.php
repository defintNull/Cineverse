<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            //'content' => fake()->paragraphs(3, true),
            'content' => fake()->realText(200, 3),
            'movies' => json_encode([550,120]),
            'author_id' => fake()->numberBetween(1, 20),
            'group_id' => fake()->numberBetween(1, 50),
            //'title' => fake()->name(),
            'title' => fake()->realText(30, 3),
        ];
    }
}
