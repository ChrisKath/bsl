<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QRBrandesTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {

    DB::table('qr_brandes')->insert([
      'name' => 'facebook',
      'image' => 'facebook.png'
    ]);
      
    DB::table('qr_brandes')->insert([
      'name' => 'instagram',
      'image' => 'instagram.jpg'
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'line',
      'image' => 'line.png'
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'wechat',
      'image' => 'wechat.png'
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'twitter',
      'image' => 'twitter.png'
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'maps',
      'image' => 'google.png'
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'baidu',
      'image' => 'baidu.png'
    ]);

  }
}
