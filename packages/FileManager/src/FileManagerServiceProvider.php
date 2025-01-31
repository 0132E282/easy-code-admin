<?php

namespace ND\FileManager;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

namespace ND\FileManager;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class FileManagerServiceProvider extends ServiceProvider
{
    public function register() {}

    public function boot()
    {
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');

        $this->loadTranslationsFrom(__DIR__ . '/lang', 'file-manager');

        $this->loadViewsFrom(__DIR__ . '/resources/views', 'file-manager');

        $this->loadViewsFrom(__DIR__ . '/resources/views', 'file-manager');
        $this->publishes([
            __DIR__ . '/resources/js' => public_path('resources/js'),
        ], 'file-manager');
    }
}
