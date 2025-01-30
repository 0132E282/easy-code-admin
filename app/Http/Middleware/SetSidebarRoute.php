<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetSidebarRoute
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $sidebarRouteName = null): Response
    {
        $route = $request->route();
        if (!$route->hasParameter('sidebar')) {
            $route->setDefaults([
                'sidebar' => [
                    'group' => 'settings',
                    'display_name' => 'system',
                ],
            ]);
        }

        return $next($request);
    }
}
