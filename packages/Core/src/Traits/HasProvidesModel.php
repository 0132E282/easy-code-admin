<?php

namespace ND\Core\Traits;

trait HasProvidesModel
{
    protected static $model;

    static function  getModel()
    {
        return call_user_func(self::$model);
    }
}
