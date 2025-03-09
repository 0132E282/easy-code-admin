<?php

namespace ND\Core;

use Illuminate\Support\ServiceProvider;
use ND\Core\Providers\RouteServiceProvider;

class CoreServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->register(RouteServiceProvider::class);
        if ($this->app->runningInConsole()) {
            $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
        }
    }

    public function boot() {}
}
