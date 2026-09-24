<?php

namespace App\Http\Controllers;

use App\Models\Cemetery;
use App\Models\Grave;
use App\Models\Parcel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GraveController extends Controller
{
    public function store(Request $request, Cemetery $cemetery, Parcel $parcel): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:50'],
            'x' => ['required', 'numeric'],
            'y' => ['required', 'numeric'],
            'width' => ['required', 'numeric', 'min:1'],
            'height' => ['required', 'numeric', 'min:1'],
            'rotation' => ['nullable', 'numeric'],
        ]);

        $parcel->graves()->create($validated);

        return back();
    }

    /**
     * A canvas ezt hívja mozgatás/átméretezés/forgatás végén
     * (onDragEnd / onTransformEnd), preserveState-tel — nincs teljes reload.
     */
    public function update(Request $request, Cemetery $cemetery, Parcel $parcel, Grave $grave): RedirectResponse
    {
        $validated = $request->validate([
            'label' => ['sometimes', 'required', 'string', 'max:50'],
            'x' => ['sometimes', 'required', 'numeric'],
            'y' => ['sometimes', 'required', 'numeric'],
            'width' => ['sometimes', 'required', 'numeric', 'min:1'],
            'height' => ['sometimes', 'required', 'numeric', 'min:1'],
            'rotation' => ['nullable', 'numeric'],
        ]);

        $grave->update($validated);

        return back();
    }

    public function destroy(Cemetery $cemetery, Parcel $parcel, Grave $grave): RedirectResponse
    {
        $grave->delete();

        return back();
    }
}
