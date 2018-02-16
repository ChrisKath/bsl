<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Clicks extends Migration {
  /**
  * Run the migrations.
  *
  * @return void
  **/
  public function up() {

    Schema::create('clicks', function (Blueprint $table) {

      $table->increments('id');
      $table->integer('urls_id')->unsigned();
      $table->foreign('urls_id')->references('id')->on('urls');
      $table->char('user_ip', 45);
      $table->timestamp('clicked_at')->useCurrent();
      $table->longText('description')->nullable();

    });

  }

  /**
  * Reverse the migrations.
  *
  * @return void
  **/
  public function down() {
    Schema::drop('clicks');
  }
}
