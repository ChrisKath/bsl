<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Urls extends Migration {
  /**
  * Run the migrations.
  *
  * @return void
  **/
  public function up() {

    Schema::create('urls', function (Blueprint $table) {
      $table->increments('id');
      $table->char('key', 16)->index();
      $table->string('uri');
      $table->char('title', 100);
      $table->date('expiry')->nullable();
      $table->string('redirect')->nullable();
      $table->boolean('enable')->default(1);
      $table->foreign('created_by')->references('id')->on('users');
      $table->foreign('updated_by')->references('id')->on('users');
      $table->dateTime('created_at')->useCurrent();
      $table->dateTime('updated_at')->useCurrent();
    });

  }

  /**
  * Reverse the migrations.
  *
  * @return void
  **/
  public function down() {
    Schema::dropIfExists('urls');
  }
}
