<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('note')->nullable()->default(null);
            $table->dateTime('due_date')->nullable();
            $table->dateTime('reminder')->nullable()->default(null);
            $table->dateTime('repeat')->nullable()->default(null);
            $table->boolean('is_done')->default(0);
            $table->boolean('is_favorite')->default(0);
            $table->boolean('is_pending')->default(0);
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
        Schema::dropIfExists('tasks');
    }
}