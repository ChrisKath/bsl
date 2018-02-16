<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model {

  /**
  * The table associated with the model.
  *
  * @var string
  **/
  protected $table = 'urls';
  protected $casts = [
    'enable' => 'integer'
  ];

  public function click() {
    return $this->hasMany(__NAMESPACE__ . '\Click');
  }

  public function tag() {
    return $this->hasMany(__NAMESPACE__ . '\Taggable');
  }
}
