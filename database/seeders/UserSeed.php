<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => env('EMAIL_ADMIN')],
            [
                'name' => 'admin',
                'email' => env('EMAIL_ADMIN'),
                'password' => bcrypt(env('EMAIL_ADMIN')),
            ]
        );
    }
}
