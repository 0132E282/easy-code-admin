<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Route;
use ND\FileManager\Http\Controllers\FileManagerController;

Route::controller(FileManagerController::class)->middleware(HandleInertiaRequests::class)->prefix('file-manager')->name('admin.file_manager.')
    ->group(function () {
        Route::post('upload/{path?}', 'upload')->where('path', '.*')->name('upload');
        Route::post('{path?}', 'create')->where('path', '.*')->name('create');
        Route::get('{path?}', 'index')->where('path', '.*')->name('index');
        Route::delete('{path?}', 'delete')->where('path', '.*')->name('delete');
    });
