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
        Schema::table('campaigns', function (Blueprint $table) {
            $table->boolean('featured_campaign')
                ->default(false)
                ->after('is_active');

            $table->string('campaign_type')
                ->nullable()
                ->after('featured_campaign');

            $table->string('campaign_category')
                ->nullable()
                ->after('campaign_type');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn([
                'featured_campaign',
                'campaign_type',
                'campaign_category',
            ]);
        });
    }
};
