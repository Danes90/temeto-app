<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cemetery;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

class CemeteryController extends Controller{

	public function index():Response{
		$cemeteries = Cemetery::query()
            ->orderBy('name')
            ->get();
        return Inertia::render('Admin/CemeteryList', [
            'cemeteries' => $cemeteries,
        ]);    
	}

    public function create():Response{
        return Inertia::render('Admin/CreateCemetery');
    }

	public function store(Request $request){

		$validated = $request->validate([
            'name' => ['required'],
     		'city' => ['required'],
     		'address' => ['required']
        ]);

        Cemetery::create([
            'name' => $request->name,
            'city' => $request->city,
            'slug' => Str::slug($request->name),
            'address' => $request->address,
            'description' => $request->description,
        ]);
	}

    public function setStatus(Request $request):RedirectResponse
    {


        $active = (int)$request->active;
        $cemeteryId = $request->cemeteryId;

        Cemetery::whereId($cemeteryId)->update(["is_active" => $active]);

        return back();
    }

}