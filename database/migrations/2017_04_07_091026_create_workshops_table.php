<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkshopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workshops', function (Blueprint $table)
        {
            $table->increments('id')->unique();
            $table->string('title');
            $table->string('description');
            $table->longText('text');
            $table->dateTime('date');
            $table->boolean('visible');
            $table->string('duration');
            $table->float('cost');
            $table->integer('template');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workshops');
    }
}
