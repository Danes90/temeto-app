<?php

namespace App\Http\Middleware;

use App\Models\Cemetery;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Használat: Route::middleware('cemetery.access')->...
 * A route-nak tartalmaznia kell egy {cemetery} paramétert
 * (pl. /cemeteries/{cemetery}/graves).
 */
class EnsureCemeteryAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $cemetery = $request->route('cemetery');
        $cemeteryId = $cemetery instanceof Cemetery ? $cemetery->id : $cemetery;

        $user = $request->user();

        if (! $cemeteryId || ! $user || ! $user->canAccessCemetery($cemeteryId)) {
            abort(403, 'Nincs jogosultsága ehhez a temetőhöz.');
        }

        return $next($request);
    }
}
