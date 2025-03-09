<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    function  index() {}
    function  formAction(Request $request)
    {
        $permissions = Permission::all()->groupBy('group_name')->transform(function ($item, $key) {
            return [
                'title' => __('permission.' . $key),
                'name' => $key,
                'permission_items' => $item->transform(function ($item) {
                    $item->display_name = __($item->display_name);
                    return $item;
                })
            ];
        })->values()->toArray();
        $data = Role::find($request->id);
        if ($data) {
            $data->permissions = $data->permissions;
        }
        $roles = Role::all();
        return Inertia::render('Roles/Form-pages', ['permissions' => $permissions, 'roles' => $roles, 'data_detail' => $data]);
    }
    function create(Request $request)
    {
        try {
            $role = Role::updateOrCreate(['name' => $request->name], [
                'name' => $request->name
            ]);

            $role->syncPermissions(collect($request->permissions)->pluck('value'));
            return redirect()->back()->with('message', [
                'type' => 'success',
                'data' => $role,
                'message' => 'success',
                'code' => 200
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('message', [
                'type' => 'error',
                'message' => $e->getMessage(),
                'code' => 500
            ]);
        }
    }
    function edit(Request $request)
    {
        try {
            $role =  Role::UpdateOrCreate(['name' => $request->name], [
                'name' => $request->name
            ]);
            $role->syncPermissions(collect($request->permissions)->pluck('value'));

            return back()->with('message', [
                'type' => 'success',
                'text' =>  'update success',
                'code' => 500
            ]);
        } catch (\Exception $e) {
            return back()->with('message', [
                'type' => 'error',
                'text' => $e->getMessage(),
                'code' => 500
            ]);
        }
    }

    function delete(Request $request)
    {
        try {
            Role::findOrFail($request->id)->where('name', '!=', 'admin')->delete();
            return back()->with('message', [
                'type' => 'success',
                'text' =>  'update success',
                'code' => 200
            ]);
        } catch (\Exception $e) {
            return back()->with('message', [
                'type' => 'error',
                'content' =>  $e->getMessage(),
                'code' => 500
            ])->setStatusCode(500);
        }
    }
}
