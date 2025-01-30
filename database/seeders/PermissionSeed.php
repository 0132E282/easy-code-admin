<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;

class PermissionSeed extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $permissionIds = collect(Route::getRoutes())
            ->filter(fn($route) => str_contains($route->getName(), 'admin') && !in_array($route->getName(), $this->permissionExclude()))
            ->map(function ($route) {
                $routeName = $route->getName();
                $permission = Permission::updateOrCreate(
                    ['name' =>  $routeName],
                    [
                        'name' => $routeName,
                        'display_name' => 'permission.' . str_replace('.', '_', $routeName),
                        'group_name' => ltrim($route->getPrefix(), '/')
                    ]
                );
                return $permission->id;
            })->toArray();
        Permission::whereNotIn('id', $permissionIds)->delete();
    }

    function permissionExclude()
    {
        return [];
    }
}
