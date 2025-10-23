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
            'content' => fake()->paragraphs(3, true),
            'movies' => json_encode([1,2,3]),
            'author_id' => fake()->numberBetween(1, 20),
            'group_id' => fake()->numberBetween(1, 50),
            'title' => fake()->name(),
        ];
    }
}
