<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('', function () { return 'GET OUT OF HERE'; });
Route::prefix('v1')->group(function () {

  Route::post('check', function (Request $request) {
    $params = $request->all();

    sleep(1);
    if ($params['username'] !== 'root' && $params['username'] !== '1010') {
      return 0;
    }

    return $params;
  });

  Route::get('logout', function (Request $request) {
    sleep(1);
    return 1;
  });

  Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
  });
});
