<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // Let's clear the users table first
      User::truncate();

      $faker = \Faker\Factory::create();

      // Let's make sure everyone has the same password and
      // let's hash it before the loop, or else our seeder
      // will be too slow.
      $password = Hash::make('1234');

      User::create([
          'name' => 'Administrator',
          'username' => 'admin',
          'email' => 'programmer@tap10.com',
          'password' => $password,
          'isAdmin' => 1,
          'remember_token' => str_random(10),
          'created_by' => 0,
          'updated_by' => 0,
      ]);

      // And now let's generate a few dozen users for our app:
      for ($i = 0; $i < 5; $i++) {
          User::create([
              'username' => str_random(6),
              'name' => $faker->name,
              'email' => $faker->email,
              'password' => $password,
              'remember_token' => str_random(10),
              'isAdmin' => 0,
              'created_by' => 1,
              'updated_by' => 1,
          ]);
      }
    }
}
