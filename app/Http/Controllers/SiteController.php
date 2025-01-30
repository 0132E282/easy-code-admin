<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Support\Facades\File;

class SiteController extends Controller
{
    function translation($lang)
    {
        $langPath = resource_path("lang/{$lang}");

        if (!File::exists($langPath)) {
            return response()->json(['error' => 'Language folder not found'], 404);
        }

        $translations = [];

        $files = File::allFiles($langPath);

        foreach ($files as $file) {
            $fileTranslations = include($file->getRealPath());

            if (!is_array($fileTranslations)) {
                continue;
            }

            $fileName = pathinfo($file->getFilename(), PATHINFO_FILENAME);

            foreach ($fileTranslations as $key => $value) {
                $translations["{$fileName}.{$key}"] = $value;
            }
        }
        return response()->json($translations);
    }
}
