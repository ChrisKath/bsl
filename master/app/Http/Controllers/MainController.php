<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainController extends Controller {

  protected $data = false;

  /**
  * Display a listing of the resource.
  *
  * @param String $key
  * @return ViewPoint, Redirect
  **/
  public function index ($key) {
    if (in_array($this->cute($key), $this->ignoreVueRoute)) return view('root');

    if ($this->state($key, true)) {
      return redirect()->away($this->data[$key]);
    }
  }

  /**
  * Getters the specified resource in storage.
  *
  * @param String $key
  * @return Boolean
  **/
  public function state ($key, $return = false) {
    // $query = DB::table('urls')->where('key', $key)->first();
    // $this->data = $query;
    $this->data = (array)[
      '1mqoNSf' => '//tuner.hol.es',
      '2vaafX4' => '//google.com',
    ];

    if ($return) return array_key_exists($key, $this->data);
  }
}
