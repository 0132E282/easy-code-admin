<?php

namespace ND\FileManager\Services;

use Illuminate\Support\Facades\Log;

class FileService
{
    private static $register = [
        'storage' =>  StorageService::class
    ];

    public static function getService($mode)
    {
        if (!isset(self::$register[$mode])) {
            Log::warning("Service '{$mode}' not found in FileService.");
            return null;
        }

        return new self::$register[$mode]();
    }
}
