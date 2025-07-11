<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DisableCsrfForApi
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Disable CSRF protection for API routes
        if ($request->is('api/*')) {
            // API routes don't need CSRF protection
            return $next($request);
        }

        // For web routes, keep CSRF protection
        return $next($request);
    }
}
