<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url as WATCH;
use App\Click as CLICK;
use App\FB;

class MainController extends Controller {

  protected $href = null;
  protected $fb = null;
  protected $device = null;

  /**
  * Display a listing of the resource.
  *
  * @param String $key
  * @return ViewPoint,Redirect
  **/
  public function index ($key) {
    if (
      in_array($this->cute($key), $this->ignoreVueRoute)
    ) return view('root');
    
    return $this->state($key) ? 
            $this->detectFB($this->href) ? 
            preg_match('/android/i',$this->device) ? 
              redirect()->away($this->fb) 
                : view('app', ['href' => $this->href , 'fb' => $this->fb])
                : redirect()->away($this->href)
                  : view('404');
  }

  /**
  * Getters the specified resource in storage.
  *
  * @param String $key
  * @return Boolean
  **/
  public function state ($key) {
    $query = WATCH::where('key', $key);

    if (!$query->count()) return (bool) $query->count();

    $query = (object) $query->first([
      'id',
      'href',
      'expiry',
      'enable',
      'redirect'
    ]);

    $this->clicked($query->id);
    $this->href = (!is_null($query->expiry) && $query->expiry <= date('Y-m-d'))
      ? $query->redirect
      : $query->href;
    
    return (bool) $query->enable;
  }

  /**
  * Save clicked log.
  *
  * @param String $this->data->id
  **/
  public function clicked ($id) {
    $click = new CLICK;
    $click->urls_id      = $id;
    $click->user_ip      = \Request::ip();
    $click->description  = \Request::header('User-Agent');
    $click->save();
  }

  public function detectFB($url){
    $user_agent = \Request::header('User-Agent');
    $regex_fb = "/(?:https?:\/\/)?(?:(?:www\.|m\.|touch\.)?(?:facebook|fb)\.(?:com|me)\/)(.*)/i";
    if(!preg_match('/iPad|iPhone|android/i',$user_agent,$device)) return false;
    if(!preg_match_all($regex_fb,$url,$m)) return false;
    $this->device = $device[0];
    $item = array(
      'package'=>'com.facebook.katana', // android package
      'scheme'   => 'fb',
      'fallback' => $this->href,
    );     
    switch (1) {
      case preg_match_all('/(?:events\/)(\d*)(?:\/|\?)?(.*)/i',$m[1][0],$s):   
        $item['host'] = 'event/'.$s[1][0];
        $item['path'] = 'event?id='.$s[1][0];        
        break;
      case preg_match_all('/(?:groups\/)(\d*)(?:\/|\?)?(.*)/i',$m[1][0],$s):
        $item['host'] = 'group/'.$s[1][0];
        $item['path'] = 'group?id='.$s[1][0];
        break;
      case preg_match_all('/(?:profile\.php\?id=)(\d*)(?:\/|\?)?(.*)/i',$m[1][0],$s): 
        $item['host'] = 'profile/'.$s[1][0];
        $item['path'] = 'profile/'.$s[1][0];
        break;
      case preg_match_all('/(?:pages\/|pg\/).*\-(\d*)(?:\/|\?)?(.*)/i',$m[1][0],$s):
        $item['host'] = 'page/'.$s[1][0];        
        $item['path'] = 'profile/'.$s[1][0];   
        break; 
      case preg_match_all('/([\w\.]+)(?:\/|\?)?(.*)/i',$m[1][0],$s) > 0:
        $fb = FB::whereRaw('LOWER(name)=\''.strtolower($s[1][0]).'\'')->first();
        if($fb){
          $item['host'] = 'page/'.$fb->id;        
          $item['path'] = 'profile/'.$fb->id;   
        }else return false;        
        break;
      default: 
        return false;
    }
    $this->fb = $this->deeplink($item,$this->device); 
    return true;
  }
}