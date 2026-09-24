<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cemetery;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Csak super admin számára elérhető felület (lásd routes/web.php:
 * 'super_admin' middleware), ahol checkbox-mátrixban kezelhető,
 * melyik felhasználó melyik temetőhöz férjen hozzá.
 */
class UserCemeteryController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->orderBy('name')
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'is_super_admin' => $user->isSuperAdmin(),
                // csak azok az ID-k, amikhez explicit pivot-rekord tartozik
                'cemetery_ids' => $user->cemeteries()->pluck('cemeteries.id'),
            ]);

        $cemeteries = Cemetery::query()
            ->orderBy('name')
            ->get(['id', 'name', 'city']);

        return Inertia::render('Admin/UserCemeteryAssignments', [
            'users' => $users,
            'cemeteries' => $cemeteries,
        ]);
    }

    /**
     * Egyetlen (user, cemetery) pár hozzárendelésének be- vagy kikapcsolása.
     * A React checkbox-mátrix minden kattintásnál egy ilyen kérést küld.
     */
    public function update(Request $request, User $user, Cemetery $cemetery): RedirectResponse
    {
        $validated = $request->validate([
            'attached' => ['required', 'boolean'],
        ]);

        if ($user->isSuperAdmin()) {
            // Super adminnak nincs értelme explicit hozzárendelést kezelni,
            // ő minden temetőhöz automatikusan hozzáfér (User::accessibleCemeteries()).
            abort(422, 'Super admin felhasználóhoz nem kezelhető explicit temető-hozzárendelés.');
        }

        if ($validated['attached']) {
            $user->cemeteries()->syncWithoutDetaching([$cemetery->id]);
        } else {
            $user->cemeteries()->detach($cemetery->id);
        }

        return back();
    }
}
