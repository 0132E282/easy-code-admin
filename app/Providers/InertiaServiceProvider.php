<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Inertia::share(
            'sidebar',
            fn() => app('sidebar.routes')
        );

        Inertia::share(
            'route',
            fn() => [
                'prefix' => trim(Route::getCurrentRoute()->getPrefix(), '/'),
            ]
        );
    }
}
