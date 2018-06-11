<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class QrBrandes extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {

    Schema::create('qr_brandes', function (Blueprint $table) {

      $table->increments('id');
      $table->char('name', 24);
      $table->char('image', 128)->nullable();
      $table->timestamp('created_at')->useCurrent();

    });

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('qr_brandes');
  }
}
