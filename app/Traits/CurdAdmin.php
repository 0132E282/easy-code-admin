<?php

namespace App\Traits;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;

trait CurdAdmin
{
    function index()
    {
        try {
            $model = $this->getModel();
            $data = $model->paginate(10, $this->columns);
            $columns = $this->generateColumns();
            return Inertia::render($this->generateView('index'), ['data' => $data, 'columns' => $columns]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function formAction()
    {
        try {
            $formPage = $this->form['views'];
            return Inertia::render($this->generateView('form'), ['page' => $formPage]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    private function generateView($action = null)
    {
        if ($action == 'form') {
            $action = $action . '-action';
        }
        return  Str::plural(class_basename($this->model)) . '/' . ($this->options[$action]['view'] ?? ucfirst($action));
    }

    private function generateColumns()
    {
        $model = $this->getModel();
        $columns = collect($this->columns)->map(function ($column) use ($model) {
            return [
                'accessorKey' => $column,
                'header' => $model->getTable() . '.' . $column
            ];
        })->toArray();
        return $columns;
    }


    function getModel()
    {
        if (empty($this->model)) {
            throw new \Exception('Model not found');
        };

        return new $this->model();
    }
}
