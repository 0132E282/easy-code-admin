<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\LaravelPackageTools\Concerns\Package\HasTranslations;

class Product extends Model
{
    use HasFactory, HasTranslations;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount_price',
        'stock',
        'sku',
        'image',
        'thumbnail',
        'status',
        'type'
    ];

    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'image' => 'array',
        'thumbnail' => 'array',
        'status' => 'boolean',
    ];
}
