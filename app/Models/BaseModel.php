<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use ND\Core\Traits\HasSlug;

class BaseModel extends Model
{
    protected $slugs = ['name', 'title'];
}
