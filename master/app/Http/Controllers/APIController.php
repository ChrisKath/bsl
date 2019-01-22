<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url as WATCH;
use App\User as USER;

class APIController extends Controller
{
  public function create(Request $req)
  {
    if($req->token !== config('app.api_key')){
      return response()->json(['err'=>'Unauthorized'], 401);
    }
    $result = [
      'http'  => isset($req->server()["HTTPS"]) && $req->server()["HTTPS"]=='on' ? 'https://' : 'http://',
      'dm'  => $req->server()["HTTP_HOST"],
      'key' => ""
    ];
    $keyLen = isset($req->len) ? $req->len : 8;
    if ($href = $this->verifyHref($req->href)){
      $result['key'] = $href->key;
      return response()->json($result);
   }
    # setup data.
    $hostname = str_replace('www.', '', parse_url(
      $req->href, PHP_URL_HOST
    ));

    # newly created.
    $watch = new WATCH;
    $watch->key         = $this->runKey($keyLen);
    $watch->href        = $req->href;
    $watch->title       = $req->title ? $req->title : $hostname;
    $watch->type        = 2;
    $watch->created_by  = 3;
    $watch->updated_by  = 3;
    $watch->save();

    # insert tags.
    if(isset($req->tags)){ $this->fetchTags($watch->id, $req->tags); }

    $result['key'] = $watch->key;
    return response()->json($result);
  }

  public function createMultiple(Request $req)
  {
    if($req->token !== config('app.api_key')){
      return response()->json(['err'=>'Unauthorized'], 401);
    }

    $result = [
      'http'  => isset($req->server()["HTTPS"]) && $req->server()["HTTPS"]=='on' ? 'https://' : 'http://',
      'dm'  => $req->server()["HTTP_HOST"],
      'key' => []
    ];

    $keyLen = isset($req->len) ? $req->len : 8;

    $allUrl = isset($req->allUrl) ? $req->allUrl : [];
    foreach ($allUrl as $k => $v) {
      if ($href = $this->verifyHref($v['href'])){
        $result['key'][$k] = $href->key;
      }else{
        # setup data.
        $hostname = str_replace('www.', '', parse_url(
          $v['href'], PHP_URL_HOST
        ));

        # newly created.
        $watch = new WATCH;
        $watch->key         = $this->runKey($keyLen);
        $watch->href        = $v['href'];
        $watch->title       = $v['title'] ? $v['title'] : $hostname;
        $watch->type        = 2;
        $watch->created_by  = 3;
        $watch->updated_by  = 3;
        $watch->save();

        # insert tags.
        if(isset($v['tags'])){ $this->fetchTags($watch->id, $v['tags']); }

        $result['key'][$k] = $watch->key;
      }
    }

    return response()->json($result);
  }

  # Helpers Scope.
  public function verifyHref($href) {
    $query = WATCH::where('href', $href);
    return $query->count()
      ? $query->first(['key'])
      : false;
  }

}
