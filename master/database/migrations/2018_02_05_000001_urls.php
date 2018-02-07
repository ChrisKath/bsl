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
      $table->char('key', 16);
      $table->text('href');
      $table->char('title', 100);
      $table->date('expiry')->nullable();
      $table->text('redirect')->nullable();
      $table->boolean('enable')->default(1);
      $table->integer('created_by')->unsigned();
      $table->integer('updated_by')->unsigned();
      $table->foreign('created_by')->references('id')->on('users');
      $table->foreign('updated_by')->references('id')->on('users');
      $table->timestamps();
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
