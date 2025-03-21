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
        Schema::create('addresss', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('full_name');
            $table->integer('phone');
            $table->integer('unit_no');  //optional
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->integer('postal_code');
            $table->string('country');
            $table->string('address_type'); //home, office
            $table->boolean('is_default');
            $table->integer('tracking_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
