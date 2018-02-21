<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User as USER;

class PassiveController extends Controller {

  /**
  * Setting new password.
  *
  * @param  \Illuminate\Http\Request $req
  * @param  int $id
  * @return \Illuminate\Http\Response
  **/
  public function index(Request $req) {
    try {
      $user = USER::where('id', $req->id)
        ->where('username', $req->username)
        ->where('passive', 0)
        ->update([
          'passive'  => 1,
          'password' => Hash::make($req->password),
          'remember_token' => str_random(16)
        ]);

      return response()->json([
        'status' => (bool) $user
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'error' => $e
      ]);
    }
  }
}
