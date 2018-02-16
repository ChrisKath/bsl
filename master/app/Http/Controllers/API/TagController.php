<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Tag as TAGS;
use App\Taggable as TAGSYNC;

class TagController extends Controller {

  public function __construct() {
    if (!$this->me()->isAdmin) exit();
  }

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index() {
    return response()->json(
      $this->queries()->get()
    );
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
    if ($this->haved($req->name)) return response()->json([
      'status' => false
    ]);

    # newly created.
    $tag = new TAGS;
    $tag->name = $req->name;
    $tag->save();

    return response()->json([
      'status' => true,
      'item' => $this->haved($tag->name)
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
    //
  }


  /**
  * Remove the specified resource from storage.
  *
  * @param  int  $id
  * @return \Illuminate\Http\Response
  **/
  public function destroy($id) {
    $drop = TAGSYNC::where('tags_id', $id)->delete();
    $drop = TAGS::where('id', $id)->delete();

    return response()->json(['status' => (bool) $drop]);
  }


  #############################################################################
  # Helpers Scope.
  public function haved($name) {
    $query = TAGS::where('name', $name);

    return $query->count()
      ? $this->queries()->where('name', $name)->first()
      : false;
  }

  public function queries() {
    return TAGS::leftJoin('url_has_tags', 'tags.id', '=', 'url_has_tags.tags_id')
      ->select(
        'id',
        'name',
        'created_at',
        DB::raw('count(url_has_tags.tags_id) used')
      )
      ->orderBy('created_at', 'desc')
      ->groupBy('tags.id');
  }
}
