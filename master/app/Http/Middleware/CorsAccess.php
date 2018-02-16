<?php

namespace App\Http\Middleware;

use Closure;

class CorsAccess
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
      $domains = [
        'http://localhost:2018',
        'http://api.tap.co',
        'http://tap.co',
        'http://de1.us',
        'http://www.de1.us'
      ];

      if (isset($request->server()['HTTP_ORIGIN'])) {
        $origin = $request->server()['HTTP_ORIGIN'];
        if (in_array($origin, $domains)) {
          header('Access-Control-Allow-Origin: ' . $origin);
          header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
          header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE');
        }
      }

      return $next($request);
    }
}
