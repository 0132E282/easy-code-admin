<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(Router $router)
    {
        Route::macro('module', function ($prefix, $controller, $options = []) {
            Route::prefix($prefix)
                ->name(!empty($options['name']) ? $options['name'] . '.' : $prefix . '.')
                ->group(function () use ($controller, $options) {

                    Route::get('/', [$controller, 'index'])
                        ->defaults('sidebar', !empty($options['index']['sidebar']) ? $options['index']['sidebar'] : null)
                        ->name('index');

                    Route::match(['get', 'post'], 'create',  [$controller, request()->isMethod('post') ? 'create' : 'formAction'])
                        ->defaults('sidebar', !empty($options['create']['sidebar']) ? $options['create']['sidebar'] : null)
                        ->name('create');

                    Route::match(['get', 'put'], '{id}',  [$controller, request()->isMethod('put') ? 'edit' : 'formAction'])
                        ->defaults('sidebar', !empty($options['edit']['sidebar']) ? $options['edit']['sidebar'] : null)
                        ->where('id', '[0-9]+')
                        ->name('edit');

                    Route::delete('delete', [$controller, 'delete'])
                        ->defaults('sidebar', !empty($options['delete']['sidebar']) ? $options['delete']['sidebar'] : null)
                        ->where('id', '[0-9]+')
                        ->name('delete');
                });
        });
    }

    public function register()
    {
        $this->app->singleton('sidebar.routes', function () {
            return Cache::remember('sidebar.routes', 3600, function () {
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
                    ->map(function ($routes, $group) {
                        if (empty($group)) {
                            return [
                                'display_name' => 'sidebar.item.' . $routes[0]['display_name'],
                                'icon' => 'sidebar.icon.' . $routes[0]['display_name'],
                                'route_name' => $routes[0]['route_name'],
                            ];
                        }
                        return  [
                            'display_name' => 'sidebar.group.' . $group,
                            'icon' => 'sidebar.icon.' . $group,
                            'items' => $routes->map(fn($route) => [
                                'display_name' => 'sidebar.item.' . $route['display_name'],
                                'route_name' => $route['route_name'],
                            ])->values()->toArray(),
                        ];
                    })->values()->toArray();
            });
        });
    }
}
