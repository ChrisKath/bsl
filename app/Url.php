<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Url extends Model
{
  protected $fillable = [
      'key', 'link', 'detail', 'expirydate','redirect_url','active','created_by' ,'updated_by' ,
  ];
  public function userCreate()
  {
    return $this->hasMany('App\User','id','created_by');
  }
  public function userUpdate()
  {
    return $this->hasMany('App\User','id','updated_by');
  }
  public static function urlinfo()
  {
    return static::with(['userCreate','userUpdate'])->get();
  }
}
