<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $accessibleCemeteries = $user ? $user->accessibleCemeteries() : collect();
        $activeCemeteryId = $request->session()->get('active_cemetery_id');

        // Ha nincs (még) kiválasztott temető, vagy a user már nem fér hozzá
        // az eddig kiválasztotthoz, automatikusan az elsőt állítjuk be aktívnak.
        if ($user && (! $activeCemeteryId || ! $accessibleCemeteries->contains('id', $activeCemeteryId))) {
            $activeCemeteryId = $accessibleCemeteries->first()?->id;
            $request->session()->put('active_cemetery_id', $activeCemeteryId);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_super_admin' => $user->isSuperAdmin(),
                ] : null,
            ],
            'cemeteries' => [
                'accessible' => $accessibleCemeteries->map(fn ($c) => [
                    'id' => $c->id,
                    'name' => $c->name,
                    'city' => $c->city,
                ])->values(),
                'active_id' => $activeCemeteryId,
            ],
        ];
    }
}
