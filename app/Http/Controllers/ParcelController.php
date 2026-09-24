<?php

namespace App\Http\Controllers;

use App\Models\Cemetery;
use App\Models\Parcel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParcelController extends Controller
{
    /**
     * Temető-szintű térkép: az összes parcella poligonja.
     */
    public function index(Cemetery $cemetery): Response
    {
        return Inertia::render('Cemeteries/Map', [
            'cemetery' => $cemetery->only(['id', 'name', 'city']),
            'parcels' => $cemetery->parcels()
                ->withCount('graves')
                ->orderBy('name')
                ->get(),
        ]);
    }

    /**
     * Parcella-szintű térkép: a parcellán belüli sírok (téglalapok).
     */
    public function show(Cemetery $cemetery, Parcel $parcel): Response
    {
        return Inertia::render('Parcels/Show', [
            'cemetery' => $cemetery->only(['id', 'name', 'city']),
            'parcel' => $parcel,
            'graves' => $parcel->graves()
                ->withCount('deceased')
                ->with('deceased')
                ->orderBy('label')
                ->get(),
        ]);
    }

    public function store(Request $request, Cemetery $cemetery): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:20'],
            'points' => ['required', 'array', 'min:3'],
            'points.*.x' => ['required', 'numeric'],
            'points.*.y' => ['required', 'numeric'],
        ]);

        $cemetery->parcels()->create($validated);

        return back();
    }

    public function update(Request $request, Cemetery $cemetery, Parcel $parcel): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:20'],
            'points' => ['sometimes', 'required', 'array', 'min:3'],
            'points.*.x' => ['required_with:points', 'numeric'],
            'points.*.y' => ['required_with:points', 'numeric'],
        ]);

        $parcel->update($validated);

        return back();
    }

    public function destroy(Cemetery $cemetery, Parcel $parcel): RedirectResponse
    {
        $parcel->delete();

        return back();
    }
}
