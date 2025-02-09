<?php

namespace ND\FileManager\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\File;
use ND\FileManager\Services\FileService;

class FileManagerController extends Controller
{
    public $fileService;
    function __construct()
    {
        $this->fileService = FileService::getService('storage');
    }

    public function index(Request $request)
    {
        $path = $request->path ?? '';
        $files = $this->fileService->all($path);

        return Inertia::render('Files/File-manager', [
            'files' => $files
        ]);
    }

    public function create(Request $request)
    {
        try {
            $this->fileService->createFolder($request->path, $request->name);
            return response()->json([
                'type' =>  'success',
                'message' =>  'Tệp đã được xóa thành công',
            ]);
        } catch (\Exception $e) {
            return back()->with('message', [
                'type' =>  'success',
                'text' =>  'Tệp đã được xóa thành công',
            ]);
        }
    }
    public function upload(Request $request)
    {
        try {
            $filePath = $this->fileService->upload($request->path, $request->file('files'));
            return response()->json([
                'type' => 'success',
                'message' => count($filePath) . ' file(s) uploaded successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'type' => 'success',
                'text' => 'File has been successfully deleted.',
            ]);
        }
    }

    public function delete(Request $request)
    {
        try {
            foreach ($request->input('files') as $file) {
                $this->fileService->delete($file);
            }
            return response()->json([
                'type' =>  'success',
                'message' =>  'Tệp đã được xóa thành công',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'text' =>  'Tệp đã được xóa thành công',
                'errors' => $e->getMessage()
            ]);
        }
    }
}
