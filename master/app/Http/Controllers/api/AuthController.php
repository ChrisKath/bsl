<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use JWTAuthException;
use App\User;

class AuthController extends Controller {

  public function __construct () {
    $this->user = new User;
  }

  public function login (Request $request) {
    $credentials = $request->only('username', 'password');
    $token = null;

    try {
      if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json([
          'status' => false,
          'message' => 'account',
        ]);
      }
    } catch (JWTAuthException $e) {
      return response()->json([
        'status' => false,
        'message' => 'token',
      ]);
    }

    // $user = JWTAuth::toUser('Bearer '.$token);
    return response()->json([
      'status' => true,
      'message' => $token,
    ]);
  }

  public function getAuthUser (Request $request) {
    $user = JWTAuth::toUser($request->input('token'));
    return response()->json(['result' => $user]);
  }
}
