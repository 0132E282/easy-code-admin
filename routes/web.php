<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard')->defaults('sidebar', [
        'display_name' => 'dashboard',
    ]);

    Route::module('users', UserController::class, [
        'name' => 'user',
        'index' => [
            'sidebar' => [
                'group' => 'users',
                'display_name' => 'users',
            ],
        ]
    ]);

    Route::prefix('setting')->name('setting.')->group(function () {
        Route::get('system', function () {
            return Inertia::render('Settings/System');
        })->name('system')->defaults('sidebar', [
            'group' => 'settings',
            'display_name' => 'system',
        ]);
    });

    Route::module('roles', RoleController::class, [
        'name' => 'role',
        'create' => [
            'sidebar' => [
                'group' => 'settings',
                'display_name' => 'roles',
            ],
        ]
    ]);

    Route::get('file-managers', [SiteController::class, 'fileManagers'])->name('file-managers')->setSidebar('file-managers');
});


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


require __DIR__ . '/auth.php';
