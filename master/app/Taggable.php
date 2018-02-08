<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taggable extends Model {

  /**
  * The table associated with the model.
  *
  * @var string
  **/
  protected $table = 'url_has_tags';
  public $timestamps = false;

  public function url() {
    return $this->belongsTo(__NAMESPACE__ . '\Url', 'urls_id');
  }

  public function tags() {
    return $this->belongsTo(__NAMESPACE__ . '\Tag', 'tags_id');
  }
}
