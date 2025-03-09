<?php

namespace ND\Core\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use ND\Casts\MultiLangCast;
use ND\Core\Services\RouteMacros;

class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        RouteMacros::register();
        $this->loadRoutesFrom(__DIR__ . '/../router/dataTransfer.php');
        $this->publishes([
            __DIR__ . '/../config/core.php' => config_path('core.php'),
        ], 'core-config');

        if ($this->app->runningInConsole()) {
            $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
            $this->publishes([
                __DIR__ . '/../database/migrations/' => database_path('migrations'),
            ], 'core-migrations');
        }
    }

    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/core.php', 'core');
    }
}
