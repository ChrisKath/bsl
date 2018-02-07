<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Click extends Model {

  /**
  * The table associated with the model.
  *
  * @var string
  **/
  protected $table = 'clickes';
  public $timestamps = false;

  public function url() {
    return $this->belongsTo(__NAMESPACE__ . '\Url');
  }
}