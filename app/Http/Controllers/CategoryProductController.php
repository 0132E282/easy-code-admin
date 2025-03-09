<?php

namespace App\Http\Controllers;

use App\Models\CategoryProduct;
use ND\Core\Traits\HasCrudAction;

class CategoryProductController extends Controller
{
    use HasCrudAction;
    public $model = CategoryProduct::class;

    public $view = [
        'index' => [
            'page' => 'table',
            'title' => 'Quản lý danh mục',
            'columns' => ['image', 'name', 'status', 'created_at'],
        ],
        'form' =>  [
            'page' => 'form',
            'title' => 'Tạo sản phẩm',
            'container' => 'ms',
            'sections' => [
                [
                    'label' => 'Thông tin danh mục',
                    'fields' => [
                        ['name' => 'thumbnail', 'ui' => 'image', 'width' => 'full',  'label' => 'thumbnail'],
                        ['name' => 'name', 'ui' => 'number', 'width' => 'full',  'label' => 'name'],
                        ['name' => 'description', 'ui' => 'textarea', 'width' => 'full', 'label' => 'description'],
                        ['name' => 'category', 'ui' => 'select', 'width' => 'full',  'label' => 'danh mục cha'],
                        ['name' => 'status', 'ui' => 'radio-list', 'width' => 'full', 'label' => 'status', 'options' => [
                            ['label' => 'Published', 'value' => 'published'],
                            ['label' => 'Unpublished', 'value' => 'unpublished']
                        ]],
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
