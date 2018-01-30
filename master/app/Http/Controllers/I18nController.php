<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class I18nController extends Controller {

  /**
  * Display the specified resource.
  *
  * @param  string $locale
  * @return \Illuminate\Http\Response
  */
  public function show($locale) {
    $path = resource_path("lang/{$locale}.json");

    abort_unless(file_exists($path), 404);

    $i18n = json_decode(file_get_contents($path, true));

    return (array)$i18n->i;
  }
}
