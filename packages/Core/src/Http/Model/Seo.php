<?php

namespace ND\Core\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SeoMeta extends Model
{
    use HasFactory;

    protected $table = 'seo_meta';

    protected $fillable = [
        'meta_title',
        'meta_description',
        'meta_keywords',
        'canonical_url',
        'og_title',
        'og_description',
        'og_image',
        'og_url',
        'og_type',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'twitter_card',
        'structured_data',
        'seoable_id',
        'seoable_type',
    ];

    protected $casts = [
        'structured_data' => 'array',
    ];

    /**
     * Define a polymorphic relationship.
     */
    public function seoable(): MorphTo
    {
        return $this->morphTo();
    }
}
