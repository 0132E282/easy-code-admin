<?php


namespace ND\FileManager\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class StorageService implements InterFileService
{
    function upload($path, $files)
    {
        $filePath = [];
        foreach ($files as $file) {
            if ($file && $file->isValid()) {
                $filePaths[] = $file->store($path, 'public');
            }
        }
        return $filePath;
    }


    function createFolder($path = '', $name = "")
    {
        $fullPath = storage_path('app/public/' . $path . '/' . $name);

        if (!File::exists($fullPath)) {
            return File::makeDirectory($fullPath, 0755, true);
        }
    }
    function find() {}
    function exists() {}
    function delete($file)
    {
        $filePath = storage_path("app/public/{$file}");
        if (!File::exists($filePath)) {
            return false;
        }
        return File::isDirectory($filePath) ? File::deleteDirectory($filePath) : File::delete($filePath);
    }

    function all($path)
    {
        return  collect([...$this->getDirectories($path), ...$this->getFiles($path)])->map(fn($item, $index) => [...$item, 'id' => $index]);
    }

    function getDirectories($path): array
    {
        return $this->getStorageItems($path, 'directories');
    }

    function getFiles($path)
    {
        return  $this->getStorageItems($path, 'files');
    }

    function getStorageItems(string $path, string $type = 'files', string $disk = 'public'): array
    {
        $storage = Storage::disk($disk);
        $items = $type === 'directories' ? $storage->directories($path) : $storage->files($path);

        return collect($items)
            ->reject(fn($item) => str_starts_with(basename($item), '.'))
            ->map(fn($item, $index) => [
                'id' => $index,
                'name' => basename($item),
                'path' => $item,
                'type' => $type === 'directories' ? 'folder' : 'file',
                'timestamp' => $storage->lastModified($item),
            ])
            ->sortByDesc('timestamp')
            ->values()
            ->toArray();
    }
}
