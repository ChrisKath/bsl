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

  const LIMIT = 10;

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index() {
    $query = $this->queries()
      ->where(function ($query) {
        return $query
          ->whereDate('expiry',  '>=', date('Y-m-d'))
          ->orWhere('expiry',  null);
      })
      ->where('enable', 1)
      ->take(static::LIMIT);

    return response()->json(
      $query->get()
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
    $timeline = CLICK::where('urls_id', $watch->id)
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
    $watch = $this->queries();
    $type  = 0;

    if ($req->search) {
      $watch = $this->ulike(
        $req->search
      );
    }

    if ($req->firuta) {
      $watch = $this->filter(
        (object) $req->firuta
      );
    }

    if ($req->ids) {
      $type  = 1;
      $watch->whereNotIn(
        'urls.id', $req->ids
      );
    }

    $watch->take(static::LIMIT);

    return response()->json([
      'type'  => $type,
      'valve' => $watch->get()
    ]);
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
    )->take(static::LIMIT);

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
    $tags = TAGSYNC::join('tags', 'tags.id', '=', 'url_has_tags.tags_id')
      ->select(
        'urls_id',
        DB::raw('GROUP_CONCAT(DISTINCT tags.name SEPARATOR \',\') AS tags')
      )
      ->groupBy('url_has_tags.urls_id');

    return WATCH::leftJoin('clicks', 'urls.id', '=', 'clicks.urls_id')
      ->leftJoin(
        DB::raw('('. $tags->toSql() .') AS sync'),
        'urls.id', '=', 'sync.urls_id'
      )
      ->select(
        'urls.id',
        'key',
        'href',
        'title',
        'expiry',
        'enable',
        'created_by',
        'urls.created_at',
        'sync.tags',
        DB::raw('count(clicks.urls_id) AS click')
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


  public function filter($params) {
    $query = $this->queries()
      ->where('enable', (int) $params->enable)
      # Finter by Clicked count...
      ->when($params->clicked[1], function($query) use ($params) {
        $query
          ->having('click', '>=', (int) $params->clicked[0])
          ->having('click', '<=', (int) $params->clicked[1]);
      })
      # Finter by Create By...
      ->when((bool) $params->created_by, function($query) use ($params) {
        $query->where('created_by', $params->created_by);
      })
      # Finter by Expiries Date...
      ->when((bool) $params->expired, function($query) use ($params) {
        $query->whereDate('expiry', '<=', date('Y-m-d'));
      }, function ($query) {
        $query->where(function ($query) {
          return $query
            ->whereDate('expiry', '>=', date('Y-m-d'))
            ->orWhere('expiry',  null);
        });
      })
      # Finter by DateRange Created...
      ->when($this->dsync($params->daterange), function($query) use ($params) {
        $query
          ->whereDate('urls.created_at', '>=', $params->daterange[0])
          ->whereDate('urls.created_at', '<=', $params->daterange[1]);
      })
      # Finter by tags...
      ->when((bool) $params->tags, function($query) use ($params) {
          $query->whereIn('urls.id', function($query) use ($params) {
            $query
              ->select('url_has_tags.urls_id')
              ->from('url_has_tags')
              ->join('tags', 'tags.id', '=', 'url_has_tags.tags_id')
              ->whereIn('url_has_tags.tags_id', $params->tags);
          });
      });

    return $query;
  }


  public function dsync($date) {
    return (strtotime($date[0]) && strtotime($date[1]))
      ? 1 : 0;
  }


  public function usync($uid) {
    return USER::where('id', $uid)->first(['name']);
  }


  public function uclick($uid) {
    return CLICK::where('urls_id', $uid)->count();
  }
}
