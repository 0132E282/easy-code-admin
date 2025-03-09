<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use ND\Core\Traits\HasCrudAction;

class ProductController extends Controller
{
    use HasCrudAction;

    public $model = Product::class;

    public $view = [
        'index' => [
            'page' => 'table',
            'title' => 'Quản lý sản phẩm',
            'columns' => ['image', 'name', 'price', 'status', 'created_at'],
        ],
        'form' =>  [
            'page' => 'form',
            'title' => 'Tạo sản phẩm',
            'container' => 'ms',
            'sections' => [
                [
                    'label' => 'User Information',
                    'fields' => [
                        ['name' => 'thumbnail', 'ui' => 'image', 'width' => 'full', 'label' => 'thumbnail'],
                        ['name' => 'image', 'ui' => 'image', 'width' => 'full', 'label' => 'image'],
                        ['name' => 'name', 'ui' => 'text', 'width' => 'full', 'label' => 'name'],
                        ['name' => 'sku', 'ui' => 'text', 'width' => 'full', 'label' => 'sku'],
                        ['name' => 'stock', 'ui' => 'number', 'width' => 'full',  'label' => 'stock'],
                        ['name' => 'price', 'ui' => 'number', 'width' => 'md',  'label' => 'price'],
                        ['name' => 'discount_price', 'ui' => 'number', 'width' => 'md',  'label' => 'discount_price'],
                        ['name' => 'status', 'ui' => 'radio-list', 'width' => 'full', 'label' => 'status', 'options' => [
                            ['label' => 'Published', 'value' => 'published'],
                            ['label' => 'Unpublished', 'value' => 'unpublished']
                        ]],
                    ],
                ],
                [
                    'label' => 'Mô tả sản phẩm',
                    'fields' => [
                        ['description' => 'thumbnail', 'ui' => 'textarea', 'width' => 'full', 'label' => 'description'],
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
