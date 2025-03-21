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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('discount_type');
            $table->integer('discount_value');
            $table->integer('min_order_amount'); 
            $table->integer('max_discount');
            $table->integer('usage_limit');
            $table->integer('used_count');
            $table->date('valid from');
            $table->date('valid_to'); 
            $table->string('status');  //active,expired,disable            
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
