<?php

namespace ND\Core\Request;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Foundation\Http\FormRequest;

class CrudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function messages(): array
    {
        return [];
    }

    public function passedValidation()
    {
        $relationships = [
            'one_to_one' => [],
            'one_to_many' => [],
            'many_to_many' => [],
        ];

        $model = new ($this->route()->controller->model)();
        if (!$model) {
            return;
        }
        foreach ($this->all() as $key => $value) {
            if (method_exists($model, $key) && is_callable([$model, $key])) {
                $relation = $model->{$key}();
                if ($relation instanceof Relation) {
                    $this->request->remove($key);
                    if ($relation instanceof HasOne || $relation instanceof BelongsTo) {
                        $relationships['one_to_one'][$key] = $value;
                    } elseif ($relation instanceof HasMany) {
                        $relationships['one_to_many'][$key] = $value;
                    } elseif ($relation instanceof BelongsToMany) {
                        $relationships['many_to_many'][$key] = $value;
                    }
                }
            }
        }
        $this->merge(['relationships' => $relationships, 'slug' => $this->name ?? $this->title ?? null]);
    }
}
