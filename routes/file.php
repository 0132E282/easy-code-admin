<?php

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

Route::controller(FileController::class)->group(function () {
    Route::get('/', 'index')->name('file.index')->defaults('sidebar', [
        'display_name' => 'file_manager',
    ]);

    Route::get('file-manager', 'fileManager')->name('file.manager');
});
