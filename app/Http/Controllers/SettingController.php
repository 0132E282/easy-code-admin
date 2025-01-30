<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SettingController extends Controller
{
    function index()
    {
        try {
            $sidebar = Setting::where('key', Setting::KEY_SIDEBAR)->value('value');
            return response()->json($sidebar);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }
}
