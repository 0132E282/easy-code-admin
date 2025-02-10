<?php

namespace ND\Core\Services;

use Illuminate\Routing\Route as Routing;
use Illuminate\Support\Facades\Route as FacadesRoute;

class RouteMacros
{
    public static function register()
    {
        self::registerModule();
        self::registerGetSidebar();
        self::registerSetSidebar();
    }

    static function registerModule()
    {
        FacadesRoute::macro('module', function ($prefix, $controller, $options = []) {
            FacadesRoute::prefix($prefix)
                ->name(!empty($options['name']) ? $options['name'] . '.' : $prefix . '.')
                ->group(function () use ($controller, $options) {
                    FacadesRoute::get('/', [$controller, 'index'])
                        ->setSidebar(...$options['index']['sidebar'] ?? [null, null])
                        ->name('index');

                    FacadesRoute::match(['get', 'post'], 'create', [$controller, request()->isMethod('post') ? 'create' : 'formAction'])
                        ->setSidebar(...$options['create']['sidebar'] ?? [null, null])
                        ->name('create');

                    FacadesRoute::match(['get', 'put'], '{id}', [$controller, request()->isMethod('put') ? 'edit' : 'formAction'])
                        ->setSidebar(...$options['edit']['sidebar'] ?? [null, null])
                        ->where('id', '[0-9]+')
                        ->name('edit');

                    FacadesRoute::delete('delete/{id?}', [$controller, 'delete'])
                        ->where('id', '[0-9]+')
                        ->name('delete');
                });
        });
    }

    static function registerGetSidebar()
    {
        FacadesRoute::macro('getSidebar', function () {
            $routes = collect(FacadesRoute::getRoutes())
                ->filter(fn($route) => str_contains($route->getName(), 'admin') && in_array('GET', $route->methods()) && !empty($route->defaults['sidebar']))
                ->map(fn($route) => [
                    'group' => $route->defaults['sidebar']['group'] ?? null,
                    'display_name' => $route->defaults['sidebar']['display_name'] ?? null,
                    'route_name' => $route->getName(),
                ]);
            $sidebars = [];
            foreach ($routes  as  $route) {
                if (!empty($route['display_name'])) {
                    if ($group = $route['group']) {
                        if (empty($sidebars[$group])) {
                            $sidebars[$group] = [
                                'display_name' => 'sidebar.group.' . $group,
                                'icon' => 'sidebar.icon.' . $group,
                                'items' => [
                                    [
                                        'display_name' => 'sidebar.item.' . $route['display_name'],
                                        'route_name' => $route['route_name'],
                                    ]
                                ]
                            ];
                        } else {
                            $sidebars[$group]['items'][] = [
                                'display_name' => 'sidebar.item.' . $route['display_name'],
                                'route_name' => $route['route_name'],
                            ];
                        }
                    } else {
                        $sidebars[] = [
                            'display_name' => 'sidebar.' . $route['display_name'],
                            'icon' => 'sidebar.icon.' . $route['display_name'],
                            'route_name' => $route['route_name'],
                        ];
                    }
                }
            }
            return array_values($sidebars);
        });
    }

    static function registerSetSidebar()
    {
        Routing::macro('setSidebar', function ($display_name, $group = null) {
            $this->defaults['sidebar'] = ['display_name' => $display_name, 'group' => $group];
            return $this;
        });
    }
}
