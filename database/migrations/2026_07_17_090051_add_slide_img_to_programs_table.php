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
        Schema::table('programs', function (Blueprint $table) {
            $table->string('img_slide_1')->nullable()->after('description');
            $table->string('img_slide_2')->nullable()->after('img_slide_1');
            $table->string('img_slide_3')->nullable()->after('img_slide_2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn(['img_slide_1, img_slide_2, img_slide_3']);
        });
    }
};
