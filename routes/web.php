<?php

use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\ProductController;
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

    Route::module(UserController::class, [
        'name' => 'user',
        'index' => [
            'sidebar' => [
                'group' => 'users',
                'display_name' => 'users',
            ],
            'breadcrumbs' => 'user',
        ],
    ]);


    // Route::module(RoleController::class, [
    //     'name' => 'role',
    //     'create' => [
    //         'sidebar' => [
    //             'group' => 'settings',
    //             'display_name' => 'roles',
    //         ],
    //     ]
    // ]);

    Route::module(ProductController::class, [
        'name' => 'product',
        'index' => [
            'sidebar' => [
                'group' => 'product',
                'display_name' => 'product',
            ],
        ]
    ]);

    Route::module(CategoryProductController::class, [
        'name' => 'category_product',
        'index' => [
            'sidebar' => [
                'group' => 'product',
                'display_name' => 'category_product',
            ],
        ]
    ]);
    Route::get('file-managers', [SiteController::class, 'fileManagers'])->name('file-managers')->setSidebar('file-managers');
});


require __DIR__ . '/auth.php';
