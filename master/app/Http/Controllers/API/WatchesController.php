<?php

namespace App\Http\Controllers\API;

use App\Watches;
use Illuminate\Http\Request;

class WatchesController extends Controller {
  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index()
  {
    //
  }

  /**
  * Show the form for creating a new resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function create()
  {
    //
  }

  /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @return \Illuminate\Http\Response
  **/
  public function store(Request $req) {
    $title = str_replace('www.', '', parse_url($req->url, PHP_URL_HOST));

    return response($title, 200);
  }

  /**
  * Display the specified resource.
  *
  * @param  \App\Watches  $watches
  * @return \Illuminate\Http\Response
  **/
  public function show(Watches $watches)
  {
    //
  }

  /**
  * Show the form for editing the specified resource.
  *
  * @param  \App\Watches  $watches
  * @return \Illuminate\Http\Response
  **/
  public function edit(Watches $watches)
  {
    //
  }

  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $request
  * @param  \App\Watches  $watches
  * @return \Illuminate\Http\Response
  **/
  public function update(Request $request, Watches $watches)
  {
    //
  }

  /**
  * Remove the specified resource from storage.
  *
  * @param  \App\Watches  $watches
  * @return \Illuminate\Http\Response
  **/
  public function destroy(Watches $watches)
  {
    //
  }
}
