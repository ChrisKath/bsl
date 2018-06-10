<?php

use Illuminate\Database\Seeder;

class QRBrandesTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {

    DB::table('qr_brandes')->insert([
      'name' => 'line',
      'symbol' => 'line.png',
      'url_scheme' => 'line://',
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'facebook',
      'symbol' => 'facebook.png',
      'url_scheme' => 'fb://',
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'twitter',
      'symbol' => 'twitter.png',
      'url_scheme' => 'twitter://',
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'instagram',
      'symbol' => 'instagram.png',
      'url_scheme' => 'instagram://',
    ]);

    DB::table('qr_brandes')->insert([
      'name' => 'wechat',
      'symbol' => 'wechat.png',
      'url_scheme' => 'weixin://',
    ]);

  }
}
