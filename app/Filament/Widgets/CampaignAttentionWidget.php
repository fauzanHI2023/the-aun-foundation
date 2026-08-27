<?php

namespace App\Filament\Widgets;

use App\Models\Campaign;
use Filament\Widgets\Widget;

class CampaignAttentionWidget extends Widget
{
    protected string $view = 'filament.widgets.campaign-attention';

    protected int|string|array $columnSpan = 2;
    protected static ?int $sort = 5;

    public function getCampaigns()
    {
        // Kriteria "perlu perhatian": end_date dekat (<=14 hari) & progress belum tercapai
        return Campaign::whereNotNull('end_date')
            ->where('end_date', '>=', now())
            ->where('end_date', '<=', now()->addDays(14))
            ->whereColumn('collected_amount', '<', 'target_amount')
            ->orderBy('end_date')
            ->limit(2)
            ->get()
            ->map(fn ($program) => [
                'category'  => strtoupper($program->category ?? $program->program_type ?? '-'),
                'title_program'     => $program->title,
                'percent'   => $program->target_amount > 0
                    ? round(($program->collected_amount / $program->target_amount) * 100)
                    : 0,
                'target'    => number_format($program->target_amount, 0, ',', '.'),
                'collected_amount' => number_format($program->collected_amount, 0, ',', '.'),
                'daysLeft'  => now()->diffInDays($program->end_date),
            ]);
    }
}
