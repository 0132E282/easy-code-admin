<?php

namespace ND\Core\Traits;


trait EloquentBase
{
    /**
     * Scope a query to search on the given columns.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        $query->when(
            $search,
            function ($query) use ($search) {
                foreach ($this->columns as $column) {
                    $query->orWhere($column, 'LIKE', '%' . $search . '%');
                }
            }
        );
        return $query;
    }

    public function scopeActive($query)
    {
        return $query->where('status', $this->ACTIVE_STATUS);
    }
}
