<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileController extends Controller
{
    function index()
    {

        return  Inertia::render('Files/Index');
    }
    function fileManager()
    {
        $directories = collect(Storage::disk('public')->directories())
            ->filter(function ($directory) {
                return !str_starts_with(basename($directory), '.');
            })
            ->map(function ($directory, $index) {
                return [
                    'id' => $index,  // or use any unique logic for ID
                    'name' => basename($directory),
                    'path' => $directory,
                ];
            })
            ->values()
            ->toArray();


        $files = collect(Storage::disk('public')->files())
            ->filter(function ($file) {
                return !str_starts_with(basename($file), '.');
            })
            ->map(function ($file, $index) {
                return [
                    'id' => $index,  // or use any unique logic for ID
                    'name' => basename($file),
                    'path' => $file,
                ];
            })
            ->values()
            ->toArray();
        return Inertia::render('Files/File-manager', [
            'directories' => $directories,
            'files' => $files
        ]);
    }
}
