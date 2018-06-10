<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class QrMockups extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {

    Schema::create('qr_mockups', function (Blueprint $table) {

      $table->increments('id');
      $table->text('data');
      $table->integer('urls_id')->unsigned();
      $table->integer('brandes_id')->unsigned();
      $table->foreign('urls_id')->references('id')->on('urls');
      $table->foreign('brandes_id')->references('id')->on('qr_brandes');

    });

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('qr_mockups');
  }
}
