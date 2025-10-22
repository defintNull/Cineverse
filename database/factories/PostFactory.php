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
            'content' => fake()->name(),
            'movies' => json_encode([1,2,3]),
            'author_id' => 1,
            'group_id' => 1,
            'title' => fake()->name(),
        ];
    }
}
