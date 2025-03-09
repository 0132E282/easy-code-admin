<?php

use Illuminate\Support\Facades\Route;
use ND\Core\Http\Controllers\DataTransferController;

Route::group(["prefix" => "{collections}", "controller" => DataTransferController::class, "as" => "data."], function () {
    Route::get('export', 'export')->name('export');
    Route::post('import', 'import')->name('import');
});
