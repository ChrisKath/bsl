<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder {
  /**
  * Run the database seeds.
  *
  * @return void
  **/
  public function run()
  {
    DB::table('users')->insert([
      'name' => 'root',
      'email' => 'root@tap10.com',
      'username' => 'root',
      'password' => Hash::make('1010'),
      'passive' => 1,
      'isAdmin' => 1,
      'created_by' => 1,
      'updated_by' => 1,
      'remember_token' => str_random(16),
    ]);

    DB::table('users')->insert([
      'name' => 'admin',
      'email' => 'admin@tap10.com',
      'username' => 'admin',
      'password' => Hash::make('1010'),
      'passive' => 1,
      'isAdmin' => 1,
      'created_by' => 1,
      'updated_by' => 1,
      'remember_token' => str_random(16),
    ]);
  }
}
