<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Használat: Route::middleware('super_admin')->...
 * Az admin felület (user-temető hozzárendelések kezelése) csak
 * super admin számára elérhető.
 */
class EnsureSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || ! $request->user()->isSuperAdmin()) {
            abort(403, 'Csak super admin férhet hozzá ehhez az oldalhoz.');
        }

        return $next($request);
    }
}
