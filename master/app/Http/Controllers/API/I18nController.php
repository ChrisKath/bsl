<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

class I18nController extends Controller {

  /**
  * Display the specified resource.
  *
  * @return \Illuminate\Http\Response
  */
  public function index() {
    $paths = glob(resource_path("lang") ."/*.json");

    $result = [];
    foreach ($paths as $files) {
      $file = (object) json_decode(file_get_contents($files, true));

      array_push($result, (array)[
        "lang"      => $file->i->lang,
        "locale"    => $file->i->locale,
        "continent" => $file->i->continent
      ]);
    }

    return json_encode($result);
  }

  /**
  * Display the specified resource.
  *
  * @param  string $locale
  * @return \Illuminate\Http\Response
  */
  public function show($locale) {
    $path = resource_path("lang/{$locale}.json");

    abort_unless(file_exists($path), 404);

    return (array) json_decode(file_get_contents($path, true));
  }
}
