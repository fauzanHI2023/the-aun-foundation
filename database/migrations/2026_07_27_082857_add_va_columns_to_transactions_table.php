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
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('va_bank_channel')->nullable()->after('payment_url');
            $table->string('va_customer_no')->nullable()->after('va_bank_channel');
            $table->string('va_number')->nullable()->after('va_customer_no');
            $table->timestamp('va_expired_at')->nullable()->after('va_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['va_bank_channel', 'va_customer_no', 'va_number', 'va_expired_at']);
        });
    }
};
