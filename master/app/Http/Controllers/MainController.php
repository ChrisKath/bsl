<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller {

  protected $data = false;

  /**
  * Display a listing of the resource.
  *
  * @return \Illuminate\Http\Response
  **/
  public function index ($key) {
    if (in_array($this->cute($key), $this->ignoreVueRoute)) return view('root');

    // verify [shortUrl]
    if ($this->state($key, true)) {
      $redirect_url = '//tuner.hol.es';
      return redirect()->away($redirect_url);
    }
  }

  /**
  * Getters the specified resource in storage.
  *
  * @param string $key
  * @return \Illuminate\Http\Response
  **/
  public function state ($key, $return = false) {
    // $query = DB::table('urls')->where('key', $key)->first();
    // $this->data = $query;
    $this->data = (array)[
      '1mqoNSf',
      '2vaafX4',
    ];

    if ($return) return in_array($key, $this->data);
  }
}
