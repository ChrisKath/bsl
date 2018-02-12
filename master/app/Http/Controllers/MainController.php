<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url as Watch;
use App\Click;

class MainController extends Controller {

  protected $href = null;

  /**
  * Display a listing of the resource.
  *
  * @param String $key
  * @return ViewPoint,Redirect
  **/
  public function index ($key) {
    if (
      in_array($this->cute($key), $this->ignoreVueRoute)
    ) return view('root');

    return $this->state($key)
      ? redirect()->away($this->href)
      : view('404');
  }

  /**
  * Getters the specified resource in storage.
  *
  * @param String $key
  * @return Boolean
  **/
  public function state ($key) {
    $query = Watch::where('key', $key);

    if (!$query->count()) return (bool) $query->count();

    $query = (object) $query->first([
      'id',
      'href',
      'expiry',
      'enable',
      'redirect'
    ]);

    $this->clicked($query->id);
    $this->href = (!is_null($query->expiry) && $query->expiry <= date('Y-m-d'))
      ? $query->redirect
      : $query->href;

    return (bool) $query->enable;
  }

  /**
  * Save clicked log.
  *
  * @param String $this->data->id
  **/
  public function clicked ($id) {
    $click = new Click;
    $click->urls_id      = $id;
    $click->user_ip      = \Request::ip();
    $click->description  = \Request::header('User-Agent');
    $click->save();
  }
}
