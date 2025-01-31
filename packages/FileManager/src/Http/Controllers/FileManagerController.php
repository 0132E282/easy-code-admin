<?php

namespace ND\FileManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use Illuminate\Support\Facades\File;

class FileManagerController extends Controller
{
    public function index(Request $request)
    {
        $path = $request->path ?? '';
        $directories = collect(Storage::disk('public')->directories($path))
            ->filter(function ($directory) {
                return !str_starts_with(basename($directory), '.');
            })
            ->map(function ($directory, $index) {
                return [
                    'id' => $index,
                    'name' => basename($directory),
                    'path' => $directory,
                ];
            })
            ->values()
            ->toArray();

        $files = collect(Storage::disk('public')->files($path))
            ->filter(function ($file) {
                return !str_starts_with(basename($file), '.');
            })
            ->map(function ($file, $index) {
                return [
                    'id' => $index,
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
    public function create(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
            ]);

            $path = $request->path;
            $name = $request->name;
            $fullPath = storage_path('app/public/' . $path . '/' . $name);

            if (!File::exists($fullPath)) {
                if (File::makeDirectory($fullPath, 0755, true)) {
                    return back();
                } else {
                    return  back();
                }
            }

            return back();
        } catch (\Exception $e) {
            return
                back();
        }
    }
    public function upload() {}
    public function delete(Request $request)
    {
        dd($request->all());
        return response()->json([
            'message' => 'File deleted successfully',
        ]);
    }
    public function click() {}
}
