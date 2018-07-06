<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use App\Url as WATCH;

class Controller extends BaseController
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  public $ignoreVueRoute = [
    'login',
    'password',
    'dashboard',
    'watch',
    'manage',
  ];

  public function cute ($value) {
    $value = explode('/', $value);
    return $value[0];
  }

  public function me () {
    return Auth::user();
  }

  public function runKey ($length = 7) {
    $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $max = mb_strlen($keyspace, '8bit') - 1;
    $key = '';

    for ($i = 0; $i < $length; ++$i) {
      $key .= $keyspace[random_int(0, $max)];
    }

    return $this->verifyKey($key);
  }

  public function verifyKey($key) {
    $query = WATCH::where('key', $key)->count();

    if (!(bool) $query) return $key;
    else $this->runKey();
  }
  public function deeplink($item,$device){
    $dl = null;
    if(preg_match('/android/i',$device)){
      $dl ='intent://';
      if(isset($item['host']))    $dl .= $item['host'];
      $dl .='#Intent;';
      $dl .= 'package='.$item['package'].';';
      if(isset($item['action']))    $dl .= 'action='.$item['action'].';';
      if(isset($item['category']))  $dl .= 'category='.$item['category'].';';
      if(isset($item['component'])) $dl .= 'component='.$item['component'].';';
      if(isset($item['scheme']))    $dl .= 'scheme='.$item['scheme'].';';
      $dl .= 'end;';
    }else if(preg_match('/iphone|ipad/i',$device)){
      $dl = $item['scheme'].'://';
      if(isset($item['path']))    $dl .= $item['path'];        
    }
    return $dl;  
  }
}
