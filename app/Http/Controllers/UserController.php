<?php

namespace App\Http\Controllers;

use App\Models\User;
use ND\Core\Traits\HasCrudAction;

class UserController extends Controller
{
    use HasCrudAction;
    public $model = User::class;

    public $relationships = ['roles'];
    public $search = ['name', 'email'];

    public $plugins = [
        'export' => ['id' => 'Id', 'photo_url' => 'hình ảnh', 'name' => 'tên', 'email' => 'email', 'roles' => 'quyền'],
        'import' => 'all',
    ];

    public $view = [
        'index' => [
            'page' => 'table',
            'title' => 'Quản lý người dùng',
            'columns' => ['name', 'email', 'created_at'],
            'filter' => [
                'created_at' => ['type' => 'date_range'],
            ],
            'actions' => [
                [
                    'action' => 'export',
                    'label' => 'Xuất dữ liệu',
                    'icon' => 'download',
                ],
                [
                    'action' => 'import',
                    'label' => 'Nhập dữ liệu',
                ],
            ],

        ],

        'form' =>  [
            'page' => 'form',
            'title' => 'Tạo người dùng',
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
