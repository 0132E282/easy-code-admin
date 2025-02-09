<?php

namespace ND\Core\Providers;

use Illuminate\Support\ServiceProvider;
use ND\Core\Services\RouteMacros;

class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        RouteMacros::register();
    }

    public function register() {}
}
