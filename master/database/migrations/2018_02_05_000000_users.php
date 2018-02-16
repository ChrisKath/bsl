<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Users extends Migration {
  /**
  * Run the migrations.
  *
  * @return void
  **/
  public function up() {

    Schema::create('users', function (Blueprint $table) {

      $table->increments('id');
      $table->string('name');
      $table->string('email')->unique();
      $table->string('username')->unique();
      $table->string('password');
      $table->integer('isAdmin')->default(0);
      $table->rememberToken();
      $table->integer('created_by')->unsigned();
      $table->integer('updated_by')->unsigned();
      $table->foreign('created_by')->references('id')->on('users');
      $table->foreign('updated_by')->references('id')->on('users');
      $table->timestamp('created_at')->useCurrent();
      $table->timestamp('updated_at');

    });

  }

  /**
  * Reverse the migrations.
  *
  * @return void
  **/
  public function down() {
    Schema::drop('users');
  }
}
