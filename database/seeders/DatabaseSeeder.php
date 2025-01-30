<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call($this->callSeed());
    }

    private function callSeed()
    {
        return [
            UserSeed::class,
            PermissionSeed::class,
            RoleSeed::class,
            settingSeed::class
        ];
    }
}
