<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Url as Watch;
use App\User;
use App\Tag;
use App\Click;
use App\Taggable;

class WatchController extends Controller {

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index() {
    $watch = $this->fetchTake();

    return response()->json(
      $watch->get()
    );
  }


  /**
  * Store a newly created resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function store(Request $req) {
    if ($href = $this->verifyHref($req->href))
      return response()->json($href);

    # setup data.
    $hostname = str_replace('www.', '', parse_url(
      $req->href, PHP_URL_HOST
    ));

    # newly created.
    $watch = new Watch;
    $watch->key         = $this->runKey();
    $watch->href        = $req->href;
    $watch->title       = $req->title ? $req->title : $hostname;
    $watch->expiry      = $req->expiry;
    $watch->redirect    = $req->redir;
    $watch->created_by  = $this->me()->id;
    $watch->updated_by  = $this->me()->id;
    $watch->save();

    # insert tags.
    $tags = $this->fetchTags(
      $watch->id,
      $req->tags
    );

    return response()->json([
      'id'  => $watch->id,
      'key' => $watch->key
    ]);
  }


  /**
  * Display the specified resource.
  *
  * @param  \App\Watch  $watch
  * @return \Illuminate\Http\Response
  **/
  public function show($key, $return = false) {
    # gathering url by key.
    $watch = Watch::where('key', $key)->first();

    if (!(bool) $watch) return response()->json((bool) $watch);

    # gathering tags on table-connect.
    $tags = Taggable::where('url_has_tags.urls_id', $watch->id)
      ->join('tags', 'tags.id', '=', 'url_has_tags.tags_id')
      ->get(['tags.id', 'tags.name']);

    # gathering clicked timeline log.
    $timeline = Click::where('urls_id', $watch->id)
      ->orderBy('clicked_at', 'desc')
      ->get(['user_ip', 'clicked_at']);

    # updated watch details.
    $watch->tags       = $tags;
    $watch->timeline   = $timeline;
    $watch->created_by = $this->usync($watch->created_by)->name;
    $watch->updated_by = $this->usync($watch->updated_by)->name;

    return $return ? $watch : response()->json($watch);
  }


  /**
  * Display the specified resource.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function showly(Request $req) {
    $watch = $this->fetchTake();
    $watch->whereNotIn(
      'urls.id', $req->items
    );

    return response()->json(
      $watch->get()
    );
  }


  /**
  * Show the form for editing the specified resource.
  *
  * @param  \App\Watch  $watch
  * @return \Illuminate\Http\Response
  **/
  public function edit(Watch $watch) {
    //
  }


  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @param  \App\Watch  $watch
  * @return \Illuminate\Http\Response
  **/
  public function update(Request $req, $id) {
    # verify key exist.
    $watch = Watch::where('key', $req->key)
      ->where('id', '!=', $id)
      ->count();
    if ($watch) return response()->json(['status' => false]);

    # update on Urls
    $watch = Watch::where('id', $id);
    $urls  = $watch->first(['id']);
    $watch->update([
      'key'       => $req->key,
      'href'      => $req->href,
      'title'     => $req->title,
      'expiry'    => $req->expiry,
      'redirect'  => $req->redir,
      'updated_by'=> $this->me()->id
    ]);

    # insert tags.
    $tags = $this->fetchTags($urls['id'], $req->tags);

    return response()->json(['status' => true]);
  }


  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function fly(Request $req) {
    $enable = Watch::where('id', $req->id)
      ->update([
        'enable' => $req->fly,
        'updated_by' => $this->me()->id
      ]);

    return response()->json([
      'status' => (bool) $enable,
      'name'   => $this->me()->name
    ]);
  }


  /**
  * Remove the specified resource from storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function destroy(Request $req, $id) {
    $drop = Taggable::where('urls_id', $id)->delete();
    $drop = Click::where('urls_id', $id)->delete();
    $drop = Watch::where('id', $id)->delete();

    return response()->json(['status' => (bool) $drop]);
  }


  #############################################################################
  # Helpers Scope.
  public function verifyHref($href) {
    $query = Watch::where('href', $href);
    return $query->count()
      ? $query->first(['key'])
      : false;
  }


  public function fetchTags($urls_id, $tags) {
    # destroyed all tags connected.
    $destroyed = Taggable::where('urls_id', $urls_id)->delete();

    foreach ($tags as $value) $tagger[] = array(
      'urls_id' => $urls_id,
      'tags_id' => (int) $value,
    );

    # insert all tags end.
    $inserted = Taggable::insert($tagger);

    return $tagger;
  }


  public function fetchTake() {
    return Watch::leftJoin('clicks', 'urls.id', '=', 'clicks.urls_id')
      ->select(
        'urls.id',
        'key',
        'href',
        'title',
        'expiry',
        'enable',
        'created_at',
        DB::raw('count(clicks.urls_id) click')
      )
      ->orderBy('created_at', 'desc')
      ->groupBy('urls.id')
      ->take(10);
  }


  public function usync($uid) {
    return User::where('id', $uid)->first(['name']);
  }


  public function uclick($uid) {
    return Click::where('urls_id', $uid)->count();
  }
}
