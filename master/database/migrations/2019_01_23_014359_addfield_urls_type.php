<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddfieldUrlsType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('urls', function (Blueprint $table) {
        $table->tinyInteger('type')->after('enable')->default(1)->comment('1 = normal , 2 = api');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('urls', function (Blueprint $table) {
        $table->dropColumn('type');
      });
    }
}
