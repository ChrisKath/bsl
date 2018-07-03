<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Url;
use App\FB;

class FBController extends Controller
{
  // private $accessToken = "EAACEdEose0cBAEXdOtLlYc2e6fk6Fg9wpCo6OzyZBRqHf7KQ6fWCimMxIZBftxQ1gioBOm311Pq3JGOo3RwSRmDY8s11RUUGWkUj3YWC595RqP4SDSp1ITH2ygwOvZCHm6wwlDdF9eWGUrV7NQyzX3jcx9Ys60VHkbhRvFvIbsMP2WfzSpGcNAhgjcR77oZD";
  private $accessToken = "EAAdrFmI1uHABAF5eK81w8LaqDCAJfXoT8KeYMay9ZBn5hdXZBGMfSvVrXzHYyDSbp6yubLowAGJlYZAypZCnJZBe2nT7Kv2H0pnFZCuZCFKJl6VtaumzqH85mABEGvd2dxeD8mhOuHbZBmVlbpBMxNcbCRRrUpY0v4ZCxNh0gZAkupxbTRZCl7BppNOJAQi9sIldVUV1YrvAZB9pjwZDZD";
  private $apiUrl = "https://graph.facebook.com/v3.0/";

  public function getId(){
    $url = Url::where('href','like','%facebook.com%')->get();
    return $url->filter(function($item, $key){      
      if($item->href && preg_match_all('/facebook.com/i', $item->href) && !preg_match_all('/developers.facebook.com/i', $item->href)){
        return $item;
      }
    })->values();
  }

  public function genDeepLink($link){
    $api = "?id=".$link;
    $api .= "&fields=app_links,id";
    $api .= "&access_token=".$this->accessToken;
    $data = $this->getGraphApi($this->apiUrl.$api);
    return $data;
  }

  public function getGraphApi($url){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => array(
        // Set Here Your Requesred Headers
          'Content-Type: application/json',
      ),
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
      return "cURL Error #:" . $err;
    } else {
      return json_decode($response, true);
    }
  }
  
  public function createAndriod($item){
    $intent ='intent:';
    if(isset($item['host']))    $intent .= $item['host'];
    $intent ='#Intent;';
    $intent .= 'package=com.facebook.katana;';
    if(isset($item['action']))    $intent .= 'action='.$item['action'].';';
    if(isset($item['category']))  $intent .= 'category='.$item['category'].';';
    if(isset($item['component'])) $intent .= 'component='.$item['component'].';';
    if(isset($item['scheme']))    $intent .= 'scheme='.$item['scheme'].';';
    $intent .= 'end;';
    return $intent;  
  }
}
