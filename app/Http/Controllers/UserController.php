<?php

namespace App\Http\Controllers;

use App\Models\User;
use ND\Core\Traits\CrudActionAdmin;

class UserController extends Controller
{
    use CrudActionAdmin;
    public $model = User::class;

    public $relationships = ['roles'];

    public $index = [
        'columns' => ['name', 'email', 'created_at']
    ];

    public $form = [
        'views' => [
            'page' => 'form',
            'container' => 'ms',
            'sections' => [
                [
                    'label' => 'User Information',
                    'fields' => [
                        ['name' => 'photo_url', 'ui' => 'image', 'width' => 'full', 'label' => 'photo_url'],
                        ['name' => 'name', 'ui' => 'text', 'width' => 'full', 'label' => 'name'],
                        ['name' => 'email', 'ui' => 'email', 'width' => 'full',  'label' => 'email'],
                        ['name' => 'password', 'ui' => 'password', 'width' => 'full', 'label' => 'password'],
                    ],
                ],
                [
                    'label' => 'Roles Information',
                    'fields' => [
                        ['name' => 'roles', 'ui' => 'multiple-select', 'width' => 'full', 'label' => 'roles'],
                    ],
                ],
            ],
            'sidebar' => [
                // 'right' => [
                //     [
                //         'label' => 'User Information',
                //         'fields' => [
                //             ['name' => 'photo_url', 'ui' => 'image', 'width' => 'full', 'label' => 'photo_url'],
                //         ]
                //     ]
                // ]
            ]
        ],
    ];
}
