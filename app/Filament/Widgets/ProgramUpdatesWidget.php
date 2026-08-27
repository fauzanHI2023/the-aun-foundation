<?php

namespace App\Filament\Widgets;

use App\Models\Campaign;
use Filament\Widgets\Widget;

class ProgramUpdatesWidget extends Widget
{
    protected string $view = 'filament.widgets.program-updates';

    protected int|string|array $columnSpan = 1;

    protected static ?int $sort = 6;

    public function getUpdates()
    {
        return Campaign::latest()
            ->limit(3)
            ->get()
            ->map(fn ($u) => [
                'imageUrl' => $u->thumbnail,
                'title'    => $u->title,
                'timeAgo'  => strtoupper($u->created_at->diffForHumans()),
            ]);
    }
}
