<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use App\Url as Watch;

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
    $query = (bool) Watch::where('key', $key)->count();

    if (!$query) return $key;
    else $this->runKey();
  }
}
