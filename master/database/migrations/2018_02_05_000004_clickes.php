<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Clickes extends Migration {
  /**
  * Run the migrations.
  *
  * @return void
  **/
  public function up() {

    Schema::create('clickes', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('urls_id')->unsigned();
      $table->foreign('urls_id')->references('id')->on('urls');
      $table->char('user_ip', 45);
      $table->dateTime('clicked_at')->useCurrent();
      $table->longText('description')->nullable();
    });

  }

  /**
  * Reverse the migrations.
  *
  * @return void
  **/
  public function down() {
    Schema::dropIfExists('clickes');
  }
}
