<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    	if($request->is('cms/*') || $request->is('cms'))
    	{
    		if(Auth::check())
    		{
    			if(!(Auth::user()->role == 'admin'))
    			{
    				return redirect('/home');
    			}
    		}
    		else
    		{
    			return redirect('/login');
    		}
    	}
    	
        return $next($request);
    }
}
