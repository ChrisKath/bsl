<?php

namespace App\Http\Middleware;

use Closure;

class SMSCore
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
        'sms.spaprogram.localhost',
        'sms.tap10.net',
        'labs.co',
        'oasis.spaprogram.net',
      ];

      if (isset($request->server()['HTTP_ORIGIN'])) {
        $origin = $request->server()['HTTP_ORIGIN'];
        if (in_array($origin, $domains)) {
          return $next($request);
        }
      }
      return response()->json(["err"=>"Something is wrong"],401);
    }
}
