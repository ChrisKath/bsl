<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\User as USER;

class PanelController extends Controller {

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
    # check something already used.
    if ($this->exist('username', $req->username)) {
      return response()->json([
        'status' => false,
        'code'   => 16
      ]);
    }
    else if ($this->exist('email', $req->email)) {
      return response()->json([
        'status' => false,
        'code'   => 40
      ]);
    }

    # newly created.
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

    return response()->json(['status' => (bool) $user]);
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
    //
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
    return USER::join('users AS udx', 'users.created_by', 'udx.id')
      ->select(
        DB::raw('users.*'),
        'udx.name AS created_by',
        'udx.name AS updated_by'
      );
  }

  public function exist($field, $value) {
    return USER::where(
      $field,
      $value
    )->count();
  }
}
