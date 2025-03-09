<?php

namespace ND\Core\Traits;

use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use ND\Core\Request\CrudRequest;

trait HasCrudAction
{
    function index(Request $request)
    {
        try {
            $pageMethod = $this->view['index'] ?? null;

            $model = $this->getModel();
            $data = $model->paginate(10, ['id', ...$pageMethod['columns']  ?? []]);
            $page['columns'] = $this->generateColumns($pageMethod['columns']);
            $page['title'] = $pageMethod['title'] ?? Route::currentRouteName();
            $page['filter'] = $pageMethod['filter'] ?? null;
            return Inertia::render($this->generateView($this->view['index']['page'] ?? 'table'), ['data' => $data ?? [], 'page' => $page]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function formAction(CrudRequest $request)
    {
        try {

            if ($id = $request->id) {
                $data = $this->getModel()->with($this->relationships)->findOrFail($id);
            } else {
                $data = $this->getDefaultValue($this->getModel());
            }
            $formPage = $this->view['form'];

            $relationshipsView = $this->getAllRelationshipsView();

            return Inertia::render($this->generateView($formPage['page'] ?? 'form'),  ['data' => $data ?? [], 'page' => $formPage, 'relationships_view' => $relationshipsView]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function create(CrudRequest $request)
    {
        try {
            $data = $this->getModel()->create($request->all());
            if ($relationships = $request->relationships) {
                if ($relationships['one_to_one']) {
                }
                if ($relationships['many_to_many']) {
                    foreach ($relationships['many_to_many'] as $relation => $values) {
                        if (method_exists($data, $relation)) {
                            $data->{$relation}()->attach($values);
                        }
                    }
                }
            }
            return back()->with([
                'type' => 'success',
                'text' => 'create message',
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return back()->with([
                'type' => 'error',
                'text' => $e->getMessage(),
            ]);
        }
    }
    function edit($id, CrudRequest $request)
    {

        try {
            $data = $this->getModel()->find($id);
            if ($relationships = $request->relationships) {
                if ($relationships['one_to_one']) {
                }
                if ($relationships['many_to_many']) {
                    foreach ($relationships['many_to_many'] as $relation => $values) {
                        if (method_exists($data, $relation)) {
                            $data->{$relation}()->sync($values);
                        }
                    }
                }
            }
            $data->update($request->all());
            return back()->with([
                'type' => 'success',
                'text' => 'update message',
                'data' => $data,
            ]);
        } catch (\Exception $e) {
        }
    }

    public function delete($id, Request $request)
    {
        try {
            $model = $this->getModel();
            $data = !empty($request->ids) && is_array($request->ids) ? $model->whereIn('id', $request->ids)->delete() : $model->find($id);
            $data->delete();
            return back()->with('message', ['type' => 'sus', 'text' => 'delete message']);
        } catch (\Exception $e) {
        }
    }
    private function getRelationships($request)
    {
        $model = $this->getModel();
        $relationships = [];
        foreach ($request as $key => $value) {
            if (method_exists($model, $key) && is_callable([$model, $key])) {
                $relation = $model->{$key}();
                if ($relation instanceof Relation) {
                    unset($request[$key]);
                    $relationships['relationships'][$key] = $value;
                }
            }
        }
        return $relationships;
    }
    public function getPage($page)
    {
        $page = [];
        $page['columns'] = $this->generateColumns($page['columns']);
        $page['title'] = $page['title'] ?? Route::currentRouteName();
        $page['filter'] = $page['filter'] ?? null;
        return $page;
    }

    private function getAllRelationshipsView()
    {
        $reflectors = [];
        if (!empty($this->relationships)) {
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
        }

        return $reflectors ?? [];
    }

    private function getDefaultValue($model)
    {
        $table =  $model->getTable();
        $columns = Schema::getColumnListing($table);
        $defaultValues = [];

        foreach ($columns as $column) {
            $type = Schema::getColumnType($table, $column);

            $defaultValues[$column] = match ($type) {
                'integer', 'bigint', 'smallint', 'mediumint', 'tinyint' => 0,
                'decimal', 'float', 'double' => 0.0,
                'boolean' => false,
                'json', 'array' => [],
                'date', 'datetime', 'timestamp' => null,
                default => '',
            };
        }
        return $defaultValues;
    }

    private function generateView($page_name = null)
    {
        return  config('core.pages', [])[$page_name];
    }

    private function generateColumns($columns)
    {
        $model = $this->getModel();
        $columns = collect($columns)->map(function ($column) use ($model) {
            return [
                'accessorKey' => $column,
                'header' => $model->getTable() . '.' . $column
            ];
        })->toArray();
        return $columns;
    }

    private function getModel()
    {
        if (empty($this->model)) {
            throw new \Exception('Model not found');
        };

        return new $this->model();
    }
}
