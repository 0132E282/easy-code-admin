<?php

namespace ND\Core\Services;

use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Routing\Route as Routing;
use Illuminate\Support\Facades\Route as FacadesRoute;
use Illuminate\Support\Str;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

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
        FacadesRoute::macro('module', function ($controller, $options = []) {
            $controller =   new  $controller();
            $nameModel = property_exists($controller, 'model') ? strtolower(class_basename($controller->model)) : null;
            $routeName = !empty($options['name']) ? $options['name'] : $nameModel;
            $prefix =  Str::snake(Str::plural($nameModel), '-');


            FacadesRoute::prefix($prefix)->name($routeName . '.')->group(function () use ($controller, $options, $routeName, $nameModel) {
                FacadesRoute::get('/', [get_class($controller), 'index'])
                    ->setSidebar(...$options['index']['sidebar'] ?? [null, null])
                    ->name('index');

                FacadesRoute::match(['get', 'post'], 'create', [get_class($controller), request()->isMethod('post') ? 'create' : 'formAction'])
                    ->setSidebar(...$options['create']['sidebar'] ?? [null, null])
                    ->name('create');

                FacadesRoute::match(['get', 'put'], '{id}', [get_class($controller), request()->isMethod('put') ? 'edit' : 'formAction'])
                    ->setSidebar(...$options['edit']['sidebar'] ?? [null, null])
                    ->where('id', '[0-9]+')
                    ->name('edit');

                FacadesRoute::delete('delete/{id?}', [get_class($controller), 'delete'])
                    ->where('id', '[0-9]+')
                    ->name('delete');

                // **Đăng ký Breadcrumbs**
                Breadcrumbs::for("admin.$routeName.index", function (BreadcrumbTrail $trail) use ($routeName, $controller) {
                    $trail->push($controller->view['index']['title'] ?? "admin_$routeName" . "_index", route("admin.$routeName.index"));
                });

                Breadcrumbs::for("admin.$routeName.create", function (BreadcrumbTrail $trail) use ($routeName, $controller) {
                    $trail->parent("admin.$routeName.index");
                    $trail->push($controller->view['form']['title'] ?? "admin_$routeName" . "_create", route("admin.$routeName.create"));
                });

                Breadcrumbs::for("admin.$routeName.edit", function (BreadcrumbTrail $trail, $param) use ($routeName) {
                    $id = $param['id'];
                    $trail->parent("admin.$routeName.index");
                    $trail->push($routeName . ' ' . $id, route("admin.$routeName.edit", $id));
                });
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
