<?php

namespace App\Services;

use App\Models\Campaign;

class CampaignService
{
    public function getActiveCampaigns()
    {
        return Campaign::query()
            ->where('is_active', true)
            ->latest()
            ->get();
    }

    public function getFeaturedCampaigns(int $limit = 6)
    {
        return Campaign::query()
            ->where('is_active', true)
            ->latest()
            ->take($limit)
            ->get();
    }

    public function findBySlug(string $slug)
    {
        return Campaign::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();
    }
}