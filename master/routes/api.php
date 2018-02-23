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
  Route::namespace('API')->group(function () {

    Route::get('i18n', 'I18nController@index');
    Route::get('i18n/{locale}', 'I18nController@show');

    Route::patch('pwd/reset', 'PassiveController@index');

    ############################################################################
    # Router Needed Authentication.
    Route::middleware('auth:api')->group(function () {

      Route::resource('watch',    'WatchController');
      Route::post('watch/fly',    'WatchController@fly');
      Route::post('watch/take',   'WatchController@showly');
      Route::post('watch/search', 'WatchController@search');

      Route::resource('tags',  'TagController');

      Route::resource('panel', 'PanelController');
      Route::post('panel/pwd/reset', 'PanelController@passive');

    });

    ############################################################################
    # Router Authentication.
    Route::group([
      'middleware' => 'api',
      'prefix' => 'auth'
    ], function () {
      Route::post('me'      , 'AuthController@me');
      Route::post('login'   , 'AuthController@login');
      Route::post('logout'  , 'AuthController@logout');
      Route::post('refresh' , 'AuthController@refresh');
    });

  });
});
