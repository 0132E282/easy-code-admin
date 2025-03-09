<?php

namespace App\Models;

use App\Casts\Slug;
use App\Casts\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends BaseModel
{
    use HasFactory;
    protected $table = 'categories';

    protected $fillable = [
        'slug',
        'parent_id',
        'name',
        'description',
        'image',
        'thumbnail',
        'status',
        'type'
    ];

    protected $casts = [
        'name' => Translatable::class,
        'image' => 'json',
        'thumbnail' => 'json',
    ];

    /**
     * Get the parent category.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * Get the child categories.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }
    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($category) {
            $category->status = 'active';
            $category->parent_id = null;
        });
    }
}
