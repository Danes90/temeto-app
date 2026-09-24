<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Cemetery;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class UserCemeteryController extends Controller{

	public function index():Response{
		$cemeteries = Cemetery::query()
            ->orderBy('name')
            ->get();
        return Inertia::render('Admin/CemeteryList', [
            'cemeteries' => $cemeteries,
        ]);    
	}

	public function store(Request $request):RedirectResponse{

		$validated = $request->validate([
            'name' => ['required'],
     		'city' => ['required'],
     		'address' => ['required']
        ]);

        $user = User::find(1);

        $cemetery = Cemetery::save(
        	'name' => $request->name,
        	'city' => $request->city,
        	'address' => $request->address,
        	'description' => $request->description,
        	'slug' => str_slug($request->name,'-')
        );

        $user->cemeteries()->detach($cemetery->id);

		return back();
	}

}