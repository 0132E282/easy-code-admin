<?php

namespace App\Http\Middleware;

use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => fn() => session()->get('message')
            ],
            'route' => [
                'prefix' => trim(Route::getCurrentRoute()->getPrefix(), '/'),
            ],
            'sidebar' => Route::getSidebar(),
            'breadcrumbs' => Breadcrumbs::exists(Route::currentRouteName()) ? Breadcrumbs::generate(Route::currentRouteName(), Route::current()->parameters()) : null,
        ];
    }
}
