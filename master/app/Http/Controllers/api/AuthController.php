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

    $user = JWTAuth::user();
    return response()->json([
      'status' => true,
      'message' => $token,
      'user' => $user,
    ]);
  }

  public function getAuthUser (Request $request) {
    $user = JWTAuth::toUser($request->input('token'));
    return response()->json(['result' => $user]);
  }

  /**
  * Log out
  * Invalidate the token, so user cannot use it anymore
  * They have to relogin to get a new token
  *
  * @param Request $request
  */

   public function logout(Request $request) {
       $this->validate($request, ['token' => 'required']);
       try {
           JWTAuth::invalidate($request->input('token'));
           return response()->json(['success' => true]);
       } catch (JWTException $e) {
           // something went wrong whilst attempting to encode the token
           return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
       }
   }
}
