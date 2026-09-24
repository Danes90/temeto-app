<?php

namespace App\Http\Controllers;

use App\Models\Cemetery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $activeCemeteryId = $request->session()->get('active_cemetery_id');

        $activeCemetery = $activeCemeteryId
            ? Cemetery::find($activeCemeteryId)
            : null;

        return Inertia::render('Dashboard', [
            'activeCemetery' => $activeCemetery,
        ]);
    }
}
