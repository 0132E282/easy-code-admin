<?php

use Illuminate\Support\Facades\Route;
use ND\FileManager\Http\Controllers\FileManagerController;

Route::controller(FileManagerController::class)->prefix('file-manager')->name('admin.file_manager.')
    ->group(function () {
        Route::get('{path?}', 'index')->where('path', '.*')->name('index');
        Route::post('{path?}', 'create')->where('path', '.*')->name('create');
        Route::post('{path?}', 'delete')->where('path', '.*')->name('delete');
    });
