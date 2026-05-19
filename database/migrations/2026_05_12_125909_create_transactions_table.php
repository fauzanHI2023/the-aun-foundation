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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->string('invoice_number')->unique();

            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            /*
            DONATUR
            */

            $table->string('name');

            $table->string('email')->nullable();

            $table->string('phone')->nullable();

            $table->boolean('is_anonymous')->default(false);

            $table->bigInteger('grand_total');

            $table->string('payment_method')->nullable();

            $table->string('payment_gateway')->default('midtrans');

            $table->string('snap_token')->nullable();

            $table->string('midtrans_transaction_id')->nullable();

            $table->string('transaction_status')->default('pending');
            // pending, paid, failed, expired

            $table->timestamp('paid_at')->nullable();

            $table->json('payment_response')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
