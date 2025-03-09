<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Support\Facades\App;

class Translatable implements CastsAttributes
{
    protected string $locale;

    public function __construct()
    {
        $this->locale = App::currentLocale();
    }

    public function get($model, string $key, mixed $value, array $attributes)
    {
        $decoded = json_decode($value, true) ?? [];
        return $decoded[$this->locale] ?? $decoded;
    }

    public function set($model, string $key, mixed $value, array $attributes)
    {
        $translatable = json_decode($attributes[$key] ?? '{}', true) ?? [];
        $translatable[$this->locale] = $value;
        return json_encode($translatable, JSON_UNESCAPED_UNICODE);
    }
}
