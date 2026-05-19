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
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('transaction_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('campaign_id')
                ->constrained()
                ->cascadeOnDelete();

            /*
            SNAPSHOT CAMPAIGN
            */

            $table->string('campaign_title');

            /*
            DONATION
            */

            $table->bigInteger('amount');

            $table->integer('quantity')->default(1);

            $table->bigInteger('subtotal');

            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};
