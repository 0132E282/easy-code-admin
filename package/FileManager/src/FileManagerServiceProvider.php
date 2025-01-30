<?php

namespace ND\FileManager;

use Illuminate\Support\ServiceProvider;

class FileManagerServiceProvider extends ServiceProvider
{
    public function register() {}

    public function boot()
    {
        // $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');
    }
}
