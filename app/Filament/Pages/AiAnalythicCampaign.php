<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use BackedEnum;
use Filament\Support\Icons\Heroicon;
use App\Models\Campaign;
use App\Services\ClaudeService;
use Filament\Forms;
use Filament\Schemas\Schema;

class AiAnalythicCampaign extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::Swatch;

    protected static ?string $recordTitleAttribute = 'campaigns';

    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.ai-analythic-campaign';

    public ?array $data = [];

    public array $conversations = [];

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\Textarea::make('question')
                    ->label('Ask AI About Campaigns')
                    ->rows(4)
                    ->required(),
            ])
            ->statePath('data');
    }

    public function ask(): void
    {
        $campaigns = Campaign::query()
            ->select(
                'title',
                'target_amount',
                'collected_amount',
                'start_date',
                'end_date',
                'is_active'
            )
            ->get()
            ->map(function ($campaign) {

                $progress =
                    $campaign->target_amount > 0
                    ? round(
                        ($campaign->collected_amount / $campaign->target_amount) * 100,
                        2
                    )
                    : 0;

                return [
                    'title' => $campaign->title,
                    'target' => $campaign->target_amount,
                    'collected' => $campaign->collected_amount,
                    'progress' => $progress,
                    'start_date' => $campaign->start_date,
                    'end_date' => $campaign->end_date,
                    'active' => $campaign->is_active,
                ];
            });

        $prompt = "
        Anda adalah Senior NGO Campaign Analyst.

        Berikut data seluruh campaign:

        " . json_encode($campaigns, JSON_PRETTY_PRINT) . "

        Pertanyaan admin:

        {$this->data['question']}

        Jawab dalam Bahasa Indonesia.

        Berikan:
        - Jawaban
        - Analisis Lanjut
        - Insight
        - Kesimpulan
        ";

        $answer = app(ClaudeService::class)
            ->ask($prompt);

        $this->conversations[] = [
            'question' => $this->data['question'],
            'answer' => $answer,
            'created_at' => now()->format('H:i:s'),
        ];

        $this->data['question'] = '';
    }
}