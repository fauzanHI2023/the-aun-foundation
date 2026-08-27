<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Inertia\Inertia;

use Illuminate\Http\Request;

class CampaignController extends Controller
{
    // public function index()
    // {
    //     $campaigns = Campaign::query()
    //         ->where('is_active', true)
    //         ->latest()
    //         ->paginate(12);

    //     return Inertia::render('Campaign/Index', [
    //         'campaigns' => $campaigns,
    //     ]);
    // }
    public function index(CampaignService $campaignService)
    {
        return Inertia::render('Campaign/Index', [
            'campaigns' => $campaignService->getActiveCampaigns(),
        ]);
    }

    public function show($slug)
    {
        $campaign = Campaign::query()
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Campaign/Show', [
            'campaign' => $campaign,
        ]);
    }
    
}
