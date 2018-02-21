<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User as USER;

class PanelController extends Controller {

  public function __construct() {
    if (!$this->me()->isAdmin) exit();
  }

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index() {
    return $this->queries()->get();
  }


  /**
  * Show the form for creating a new resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function create() {
    //
  }


  /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function store(Request $req) {
    # newly created.
    try {
      $user = new USER;
      $user->isAdmin        = $req->isAdmin;
      $user->name           = $req->name;
      $user->email          = $req->email;
      $user->username       = $req->username;
      $user->password       = Hash::make($req->password);
      $user->created_by     = $this->me()->id;
      $user->updated_by     = $this->me()->id;
      $user->remember_token = str_random(16);
      $user->save();

      return response()->json([
        'status' => (bool) $user
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'error'  => $e->errorInfo
      ]);
    }
  }


  /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function passive(Request $req) {
    $user = USER::where('id', $req->id)
      ->where('username', $req->username)
      ->update([
        'passive' => 0
      ]);

    return response()->json([
      'status' => (bool) $user
    ]);
  }


  /**
  * Display the specified resource.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  **/
  public function show($id) {
    //
  }


  /**
  * Show the form for editing the specified resource.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  **/
  public function edit($id) {
    //
  }


  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @param  int  $id
  * @return \Illuminate\Http\Response
  **/
  public function update(Request $req, $id) {
    # update user account.
    try {
      $user = USER::where('id', $id)
        ->update([
          'isAdmin'         => $req->isAdmin,
          'name'            => $req->name,
          'email'           => $req->email,
          'username'        => $req->username,
          'updated_by'      => $this->me()->id
        ]);

      return response()->json([
        'status' => (bool) $user
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'error'  => $e->errorInfo
      ]);
    }
  }


  /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  **/
  public function destroy($id) {
    //
  }


  #############################################################################
  # Helpers Scope.
  public function queries() {
    return USER::select(DB::raw('users.*'),
        'cdx.name AS created_by',
        'udx.name AS updated_by'
      )
      ->join('users AS cdx', 'users.created_by', 'cdx.id')
      ->join('users AS udx', 'users.updated_by', 'udx.id')
      ->orderBy('id');
  }
}
