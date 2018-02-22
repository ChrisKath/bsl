<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Url as WATCH;
use App\User as USER;
use App\Click as CLICK;
use App\Taggable as TAGSYNC;

class WatchController extends Controller {

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index() {
    return response()->json(
      $this->queries()->take(10)->get()
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
    $watch = new WATCH;
    $watch->key         = $this->runKey();
    $watch->href        = $req->href;
    $watch->title       = $req->title ? $req->title : $hostname;
    $watch->expiry      = $req->expiry;
    $watch->redirect    = $req->redir;
    $watch->created_by  = $this->me()->id;
    $watch->updated_by  = $this->me()->id;
    $watch->save();

    # insert tags.
    $this->fetchTags($watch->id, $req->tags);

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
    $watch = WATCH::where('key', $key)->first();

    if (!(bool) $watch) return response()->json((bool) $watch);

    # gathering tags on table-connect.
    $tags = TAGSYNC::where('url_has_tags.urls_id', $watch->id)
      ->join('tags', 'tags.id', '=', 'url_has_tags.tags_id')
      ->get(['tags.id', 'tags.name']);

    # gathering clicked timeline log.
    $timeline = CLICK::where('urls_id', $watch->id)->take(15)
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
  * Display the specified showly.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function showly(Request $req) {
    $watch = ($req->search)
      ? $this->ulike($req->search)
      : $this->queries();

    $watch->whereNotIn(
      'urls.id', $req->ids
    )
    ->take(10);

    return response()->json(
      $watch->get()
    );
  }


  /**
  * Display the specified searching.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function search(Request $req) {
    $watch = $this->ulike(
      $req->search
    )->take(10);

    return response()->json(
      $watch->get()
    );
  }


  /**
  * Display the specified Filters.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function firuta(Request $req) {
    $date_begin = date('Y-m-d', strtotime($req->daterange[0]));
    $date_end   = date('Y-m-d', strtotime($req->daterange[1]));

    $query = $this->queries();
    if ($req->clicked[0]) $query->having('click', '>=', $req->clicked[0]);
    if ($req->clicked[1]) $query->having('click', '<=', $req->clicked[1]);
    if ($req->created_by) $query->where('created_by', $req->created_by);
    if ($req->daterange)  $query->whereDate('urls.created_at', '>=', $date_begin);
    if ($req->daterange)  $query->whereDate('urls.created_at', '<=', $date_end);
    if ($req->enable)     $query->where('enable', $req->enable);
    if ($req->expired)    $query->where('expiry', '<>', NULL);
    $query->whereIn('tags.id', $req->tags);

    return response()->json(
      $query->take(10)->get()
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
    $watch = WATCH::where('key', $req->key)
      ->where('id', '!=', $id)
      ->count();
    if ($watch) return response()->json(['status' => false]);

    # update on Urls
    $watch = WATCH::where('id', $id);
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
    $this->fetchTags($urls['id'], $req->tags);

    return response()->json(['status' => true]);
  }


  /**
  * Update the specified resource in storage.
  *
  * @param  \Illuminate\Http\Request  $req
  * @return \Illuminate\Http\Response
  **/
  public function fly(Request $req) {
    $enable = WATCH::where('id', $req->id)
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
    $drop = TAGSYNC::where('urls_id', $id)->delete();
    $drop = CLICK::where('urls_id', $id)->delete();
    $drop = WATCH::where('id', $id)->delete();

    return response()->json(['status' => (bool) $drop]);
  }


  ##############################################################################
  # Helpers Scope.
  public function verifyHref($href) {
    $query = WATCH::where('href', $href);
    return $query->count()
      ? $query->first(['key'])
      : false;
  }


  public function fetchTags($urls_id, $tags) {
    # destroyed all tagsync.
    TAGSYNC::where('urls_id', $urls_id)->delete();

    if (!count($tags)) return null;

    foreach ($tags as $value) $tagger[] = array(
      'urls_id' => $urls_id,
      'tags_id' => (int) $value,
    );

    # insert all tagsync.
    TAGSYNC::insert($tagger);
  }


  public function queries() {

    return WATCH::leftJoin('clicks', 'urls.id', '=', 'clicks.urls_id')
      ->leftJoin('url_has_tags AS sync', 'urls.id', '=', 'sync.urls_id')
      ->leftJoin('tags', 'tags.id', '=', 'sync.tags_id')
      ->select(
        'urls.id',
        'key',
        'href',
        'title',
        'expiry',
        'enable',
        'created_by',
        'urls.created_at',
        DB::raw('count(clicks.urls_id) as click' ),
        DB::raw('GROUP_CONCAT(DISTINCT tags.name SEPARATOR \',\') AS tags'),
        DB::raw('GROUP_CONCAT(DISTINCT tags.id SEPARATOR \',\') AS tags_id')

      )
      ->orderBy('created_at', 'desc')
      ->groupBy('urls.id');
  }


  public function ulike($search) {
    $query = $this->queries()
      ->where(function ($query) use ($search) {
        return $query->where('title',  'LIKE', '%'. $search .'%')
          ->orWhere('key',  'LIKE', '%'. $search .'%')
          ->orWhere('href', 'LIKE', '%'. $search .'%');
      });

    return $query;
  }


  public function usync($uid) {
    return USER::where('id', $uid)->first(['name']);
  }


  public function uclick($uid) {
    return CLICK::where('urls_id', $uid)->count();
  }
}
