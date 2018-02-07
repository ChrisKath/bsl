<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('tags')->insert(['name' => 'promotion']);
      DB::table('tags')->insert(['name' => 'campaign']);
      DB::table('tags')->insert(['name' => 'other']);
    }
}
