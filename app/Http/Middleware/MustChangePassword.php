<?php

namespace App\Http\Middleware;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Middleware;

class MustChangePassword extends Middleware{

	public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        //ez még nem müködik valamiért

        if ($user && (int)$user->must_change_password === 0 && !$request->routeIs('password.confirm')) {
            //return redirect()->route('password.confirm');
        }

        return $next($request);
    }
}