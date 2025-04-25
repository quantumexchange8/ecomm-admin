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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('total_price');
            $table->string('order status'); //pending, processing, delivered,shipped,cancelled
            $table->integer('discount');
            $table->integer('tracking_number'); 
            $table->string('payment_status'); //pending,paid,failed,refunded
            $table->string('shipping_status');  //pending,shipped,delivered
            $table->string('shipping_method'); //delivery or pickup
            $table->date('estimated_delivery');
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
