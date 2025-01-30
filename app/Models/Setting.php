<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    const KEY_SIDEBAR = 'admin_sidebar';

    protected $fillable = [
        'key',
        'value',
    ];
}
