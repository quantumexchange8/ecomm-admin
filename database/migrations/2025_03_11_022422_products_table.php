<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku');  //product code
            $table->string('description');
            $table->integer('price');
            $table->integer('stock');
            $table->unsignedBigInteger('category_id');
            $table->integer('weight');
            $table->integer('width');
            $table->integer('length');
            $table->integer('height');
            $table->string('fragile'); //yes,no
            $table->string('status'); //active or inactice
            $table->timestamps();
        });
    

    }

    /**
     * Reverse the migrations.
     */
};
