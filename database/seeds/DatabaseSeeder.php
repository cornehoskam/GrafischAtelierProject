<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call('UsersTableSeeder');
         $this->call('NavigationTableSeeder');
         $this->call('WorkshopsTableSeeder');
         $this->call('NewsArticleTableSeeder');
    }
}
