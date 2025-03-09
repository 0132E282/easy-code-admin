<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryProduct extends Category
{
    public function products()
    {
        return $this->morphMany(Product::class, 'categorizables');
    }
    protected $attributes = [
        'type' => 'product',
    ];
}
