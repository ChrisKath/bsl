<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller {

  /**
  * Create a new AuthController instance.
  *
  * @return void
  **/
  public function __construct() {
    $this->middleware('auth:api', [
      'except' => ['login']
    ]);
  }

  /**
  * Get a JWT via given credentials.
  *
  * @return \Illuminate\Http\JsonResponse
  **/
  public function login(Request $req) {
    $credentials = request(['username', 'password']);

    if (!$token = Auth::attempt($credentials)) {
      return response()->json([
        'error' => 'Unauthorized'
      ]);
    }

    return $this->respondWithToken($token);
  }

  /**
  * Get the authenticated User.
  *
  * @return \Illuminate\Http\JsonResponse
  **/
  public function me() {
    return response()->json(
      Auth::user()
    );
  }

  /**
  * Log the user out (Invalidate the token).
  *
  * @return \Illuminate\Http\JsonResponse
  **/
  public function logout() {
    Auth::logout();

    return response()->json([
      'status'  => true,
      'message' => 'Successfully logged out'
    ]);
  }

  /**
  * Refresh a token.
  *
  * @return \Illuminate\Http\JsonResponse
  **/
  public function refresh() {
    return $this->respondWithToken(
      Auth::refresh(true, true)
    );
  }

  /**
  * Get the token array structure.
  *
  * @param  string $token
  *
  * @return \Illuminate\Http\JsonResponse
  **/
  protected function respondWithToken($token) {
    return response()->json([
      'token_type'    => 'bearer',
      'access_token'  => $token,
      'expires_in'    => Auth::factory()->getTTL()
    ]);
  }
}
