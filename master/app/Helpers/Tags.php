<?php

namespace App\Helpers;

use App\Taggable;

class Tags {

  public function destroy($column, $id) {
    return Taggable::where($column, $id)->delete();
  }

}
