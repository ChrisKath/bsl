<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder {
  /**
  * Run the database seeds.
  *
  * @return void
  **/
  public function run() {
    // Let's clear the users table first
    App\User::truncate();

    $faker = \Faker\Factory::create();

    // Let's make sure everyone has the same password and
    // let's hash it before the loop, or else our seeder
    // will be too slow.
    App\User::create([
      'name' => 'display name',
      'email' => 'admin@tap10.com',
      'username' => 'admin',
      'password' => Hash::make('1010'),
      'isAdmin' => 1,
      'remember_token' => str_random(16),
    ]);
  }
}
