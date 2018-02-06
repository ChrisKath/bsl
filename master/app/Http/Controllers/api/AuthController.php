<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

<<<<<<< HEAD
class AuthController extends Controller
{
  public function __construct()
   {
       $this->user = new User;
   }

   public function login(Request $request){
       $credentials = $request->only('username', 'password');
       $token = null;
       try {
           if (!$token = JWTAuth::attempt($credentials)) {
               return response()->json([
                   'response' => 'error',
                   'message' => 'Invalid email or password',
               ], 401);
           }
       } catch (JWTAuthException $e) {
           return response()->json([
               'response' => 'error',
               'message' => 'Could not create token!',
           ], 500);
       }
       $user = JWTAuth::user();
       return response()->json([
           'response' => 'success',
           'result' => [
               'token' => $token,
               'user' => $user
           ],
       ], 200);
   }

   public function getAuthUser(Request $request){
       $user = JWTAuth::toUser($request->token);
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
    
=======
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
    $expires = $req->remember
      ? 21600 # 15D
      : 30;   # 30m

    if (!$token = Auth::setTTL($expires)->attempt($credentials)) {
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
>>>>>>> c5ba54353360fc2fa29bbec094910cc563ba4af0
}
