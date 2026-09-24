<?php

namespace App\Http\Controllers;

use App\Models\Cemetery;
use App\Models\Deceased;
use App\Models\Grave;
use App\Models\Parcel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DeceasedController extends Controller
{
    public function store(Request $request, Cemetery $cemetery, Parcel $parcel, Grave $grave): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'death_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $grave->deceased()->create($validated);

        return back();
    }

    public function update(Request $request, Cemetery $cemetery, Parcel $parcel, Grave $grave, Deceased $deceased): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date'],
            'death_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $deceased->update($validated);

        return back();
    }

    public function destroy(Cemetery $cemetery, Parcel $parcel, Grave $grave, Deceased $deceased): RedirectResponse
    {
        $deceased->delete();

        return back();
    }
}
