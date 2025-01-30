<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect($this->roles())->each(function ($role) {
            if ($permissions = $role['permissions']) {
                $roleCurrent =  Role::UpdateOrCreate(['name' => $role['name']], [
                    'name' => $role['name']
                ]);
                $roleCurrent->syncPermissions($permissions);
            }
        });
    }

    private function roles()
    {
        return [
            [
                'name' => 'admin',
                'permissions' => Permission::all(),
            ]
        ];
    }
}
