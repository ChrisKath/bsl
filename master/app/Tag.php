<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class tag extends Model {

  public $timestamps = false;

  public function url() {
    return $this->hasMany(__NAMESPACE__ . 'Taggable');
  }
}
