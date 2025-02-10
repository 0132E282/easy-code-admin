<?php

namespace ND\Core\Traits;

use Illuminate\Http\Request;
use Inertia\Inertia;

trait CrudActionAdmin
{
    const PAGE_LAYOUT = [
        'table' => 'Admins/Table-page',
        'form' => 'Admins/Form-page',
    ];
    function index(Request $request)
    {
        try {
            $page = [];
            $model = $this->getModel();
            $data = $model->search($request->search)->paginate(10, ['id', ...$this->index['columns']  ?? []]);
            $page['columns'] = $this->generateColumns();
            return Inertia::render($this->generateView($this->index['page'] ?? 'table'), ['data' => $data, 'page' =>  $page]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function formAction(Request $request)
    {
        try {

            if ($id = $request->id) {
                $data = $this->getModel()->findOrFail($id);
                if ($relationships = $this->form['relationships']) {
                    $data->load($relationships);
                    foreach ($relationships as $relationship) {
                        $data[$relationship] = $data->{$relationship};
                    }
                }
            }
            $formPage = $this->form['views'];
            $relationshipsView = $this->getAllRelationshipsView();
            return Inertia::render($this->generateView($this->form['page'] ?? 'form'), ['data' => $data ?? [], 'page' => $formPage, 'relationships_view' => $relationshipsView]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    function create(Request $request)
    {
        try {
            $data = $this->getModel()->create($request->all());
            foreach ($request->relationships as $key => $value) {
                $data->{$key}()->create($value);
            }
            return response()->back()->with([
                'type' => 'success',
                'text' => 'create message',
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            dd(
                $e->getMessage()
            );
            return back()->with([
                'type' => 'error',
                'text' => $e->getMessage(),
            ]);
        }
    }

    function edit($id, Request $request)
    {
        try {

            $data = $this->getModel()->find($id)->update($request->all());
            foreach ($request->relationships as $key => $value) {
                $data->{$key}()->create($value);
            }
            return response()->json($data);
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

    private function getAllRelationshipsView()
    {
        $reflectors = [];
        if ($relationships = $this->form['relationships']) {
            foreach ($relationships as $relationship) {
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

        return $reflectors;
    }

    private function generateView($page_name = null)
    {
        return  self::PAGE_LAYOUT[$page_name];
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

    private function getModel()
    {
        if (empty($this->model)) {
            throw new \Exception('Model not found');
        };

        return new $this->model();
    }
}
