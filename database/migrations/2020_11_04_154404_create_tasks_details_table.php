<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tasks_id');
            $table->string('step');
            $table->boolean('is_done')->default(0);
            $table->timestamps();

            $table->foreign('tasks_id')->references('id')->on('tasks')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks_details');
    }
}