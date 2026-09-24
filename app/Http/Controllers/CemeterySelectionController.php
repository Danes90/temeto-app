<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CemeterySelectionController extends Controller
{
    /**
     * A bejelentkezett felhasználó aktív (jelenleg szerkesztett) temetőjének
     * beállítása a session-ben. A React CemeterySwitcher komponens hívja.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'cemetery_id' => ['required', 'integer'],
        ]);

        $user = $request->user();

        if (! $user->canAccessCemetery($validated['cemetery_id'])) {
            abort(403, 'Nincs jogosultságod ehhez a temetőhöz.');
        }

        $request->session()->put('active_cemetery_id', $validated['cemetery_id']);

        return back();
    }
}
