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
            $table->string('qr_reference_no')->nullable()->after('va_expired_at');
            $table->text('qr_content')->nullable()->after('qr_reference_no');
            $table->timestamp('qr_expired_at')->nullable()->after('qr_content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn(['qr_reference_no', 'qr_content', 'qr_expired_at']);
        });
    }
};
