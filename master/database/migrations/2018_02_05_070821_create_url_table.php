<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUrlTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('urls', function (Blueprint $table) {
          $table->increments('id');
          $table->string('key',16);
          $table->text('url');
          $table->text('detail');
          $table->date('expirydate');
          $table->text('redirect_url');
          $table->tinyInteger('active')->default(1);
          $table->integer('created_by')->unsigned();
          $table->integer('updated_by')->unsigned();
          $table->foreign('created_by')->references('id')->on('users');
          $table->foreign('updated_by')->references('id')->on('users');
          $table->timestamps();
        });

        Schema::create('tags', function (Blueprint $table) {
          $table->increments('id');
          $table->string('name',100);
        });

        Schema::create('url_has_tags', function (Blueprint $table) {
          $table->integer('url_id')->unsigned();
          $table->integer('tag_id')->unsigned();
          $table->foreign('url_id')->references('id')->on('urls');
          $table->foreign('tag_id')->references('id')->on('tags');
        });

        // Schema::create('history_click', function (Blueprint $table) {
        //   $table->increments('id');
        //   $table->integer('url_id')->unsigned();
        //   $table->foreign('url_id')->references('id')->on('urls');
        //   $table->string('ipaddress',32);
        //   $table->timestamps('click_date');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('urls');
      Schema::dropIfExists('tags');
      Schema::dropIfExists('url_has_tags');
      Schema::dropIfExists('history_click');
    }
}
