<?php

use Illuminate\Database\Seeder;

class NewsfilterTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('newsfilters')->delete();
    	
    	$filters = array(
    	    array(
    	        'id' => 1,
                'name' => 'Algemeen'
            ),
            array(
                'id' => 2,
                'name' => 'Vacatures'
            )
        );
    	
    	DB::table('newsfilters')->insert($filters);
    	
    }
}
