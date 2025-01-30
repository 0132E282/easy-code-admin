<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;

class settingSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(['key' => Setting::KEY_SIDEBAR], [
            'value' => json_encode($this->navSidebar()),
        ]);
    }
    public function navSidebar()
    {
        return collect(Route::getRoutes())
            ->filter(
                fn($route) => str_contains($route->getName(), 'admin')
                    && in_array('GET', $route->methods())
                    && !empty($route->defaults['sidebar'])
            )
            ->map(fn($route) => [
                'group' => $route->defaults['sidebar']['group'] ?? null,
                'display_name' => $route->defaults['sidebar']['display_name'] ?? null,
                'route_name' => $route->getName(),
            ])
            ->groupBy('group')
            ->map(fn($routes, $group) => [
                'name' => $group,
                'icon' => 'sidebar.group.' . $group,
                'items' => $routes->map(fn($route) => [
                    'display_name' => 'sidebar.item.' . $route['display_name'],
                    'route_name' => $route['route_name'],
                ])->values()->toArray(),
            ])->values()->toArray();
    }
}
