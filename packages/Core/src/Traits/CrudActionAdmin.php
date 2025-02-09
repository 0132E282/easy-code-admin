<?php

namespace ND\Core\Traits;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;

trait CrudActionAdmin
{
    function index()
    {
        try {
            $model = $this->getModel();
            $data = $model->paginate(10, $this->index['columns']);
            $columns = $this->generateColumns();
            return Inertia::render($this->generateView('index'), ['data' => $data, 'columns' =>  $columns]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function formAction()
    {
        try {
            $formPage = $this->form['views'];
            $relationshipsView = $this->getAllRelationshipsView();
            return Inertia::render($this->generateView('form'), ['page' => $formPage, 'relationships_view' => $relationshipsView]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }
    function getAllRelationshipsView()
    {
        $reflectors = [];
        foreach ($this->relationships as $relationship) {
            $modelInstance = is_string($this->model) ? new $this->model : $this->model;
            $reflectorClass = get_class($modelInstance->{$relationship}()->getRelated());
            $reflectors[$relationship] = [
                'placeholder' => class_basename($reflectorClass),
                'options' => $reflectorClass::all()->transform(function ($item) {
                    return [
                        'label' => $item->name ?? $item->title,
                        'value' => $item->id,
                        'id' => $item->id,
                    ];
                })
            ];
        }
        return $reflectors;
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
        $columns = collect($this->index['columns'])->map(function ($column) use ($model) {
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
