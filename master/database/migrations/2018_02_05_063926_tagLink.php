<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TagLink extends Migration {
  /**
  * Run the migrations.
  *
  * @return void
  **/
  public function up() {

    Schema::create('url_has_tags', function (Blueprint $table) {
      $table->foreign('urls_id')->references('id')->on('urls');
      $table->foreign('tags_id')->references('id')->on('tags');
    });

  }

  /**
  * Reverse the migrations.
  *
  * @return void
  **/
  public function down() {
    Schema::dropIfExists('url_has_tags');
  }
}
