<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CurdAdmin;

class UserController extends Controller
{
    use CurdAdmin;
    public $model = User::class;

    public $columns = [
        'name',
        'email',
        'created_at',
    ];

    public $relationships = ['roles'];

    public $form = [
        'views' => [
            [
                'label' => 'User Information',
                'fields' => [
                    ['name' => 'photo_url', 'ui' => 'image', 'width' => 'full', 'label' => 'photo_url'],
                    ['name' => 'name', 'ui' => 'text', 'width' => 'md', 'label' => 'name'],
                    ['name' => 'email', 'ui' => 'email', 'width' => 'md',  'label' => 'email'],
                    ['name' => 'password', 'ui' => 'password', 'width' => 'full', 'label' => 'password'],
                ],
            ],
            [
                'label' => 'Roles Information',
                'fields' => [
                    ['name' => 'roles', 'ui' => 'select', 'width' => 'full', 'label' => 'roles'],
                ],
            ],
        ],
    ];
}
