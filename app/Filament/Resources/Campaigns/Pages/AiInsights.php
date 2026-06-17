<?php

namespace App\Filament\Resources\Campaigns\Pages;

use App\Filament\Resources\Campaigns\CampaignResource;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;
use Filament\Resources\Pages\Page;
use App\Models\Campaign;
use App\Services\ClaudeService;
use Filament\Forms;
use Filament\Schemas\Schema;

class AiInsights extends Page implements Forms\Contracts\HasForms
{
    use InteractsWithRecord;
    use Forms\Concerns\InteractsWithForms;

    protected static string $resource = CampaignResource::class;

    protected string $view = 'filament.resources.campaigns.pages.ai-insights';

    public ?array $data = [];

    public string $answer = '';

    public function form(Schema $schema): Schema
    {
        return $schema
        ->components([
            Forms\Components\Textarea::make('question')
                ->label('Ask AI')
                ->rows(4)
                ->required(),
        ])
        ->statePath('data');
    }

    public function ask(): void
{
    $campaign = $this->record;

    $progress = $campaign->target_amount > 0
        ? round(($campaign->collected_amount / $campaign->target_amount) * 100, 2)
        : 0;

    $daysLeft = $campaign->end_date
        ? now()->diffInDays($campaign->end_date, false)
        : null;

    $prompt = "
    Anda adalah Senior NGO Campaign Analyst.

    Analisis campaign berikut:

    Judul:
    {$campaign->title}

    Deskripsi:
    {$campaign->description}

    Target Donasi:
    Rp {$campaign->target_amount}

    Dana Terkumpul:
    Rp {$campaign->collected_amount}

    Progress:
    {$progress}%

    Tanggal Mulai:
    {$campaign->start_date}

    Tanggal Berakhir:
    {$campaign->end_date}

    Sisa Hari:
    {$daysLeft}

    Status Aktif:
    " . ($campaign->is_active ? 'Ya' : 'Tidak') . "

    Pertanyaan Admin:
    {$this->data['question']}

    Berikan jawaban dalam Bahasa Indonesia.

    Format jawaban:

    ## Ringkasan

    ## Analisis

    ## Rekomendasi
    ";

    $this->answer = app(ClaudeService::class)->ask($prompt);
}

    public function mount(int|string $record): void
    {
        $this->record = $this->resolveRecord($record);
    }
}
