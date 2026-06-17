<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use BackedEnum;
use Filament\Support\Icons\Heroicon;
use App\Models\Campaign;
use App\Services\ClaudeService;
use Filament\Forms;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Filament\Forms\Components\FileUpload;
use Filament\Notifications\Notification;

class AiCampaignGenerator extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;
    protected static string|BackedEnum|null $navigationIcon = Heroicon::TableCells;

    protected static ?string $recordTitleAttribute = 'campaigns';

    protected static ?int $navigationSort = 1;
    protected string $view = 'filament.pages.ai-analythic-donor';
    public ?array $data = [];

    public array $conversations = [];

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\Textarea::make('prompt')
                    ->label('Ai Campaign Generator')
                    ->rows(6)
                    ->required(),
                
                FileUpload::make('thumbnail')
                    ->image()
                    ->directory('campaigns')
                    ->disk('public')
                    ->required(),
            ])
            ->statePath('data');
    }

    public function ask(): void
    {
        $prompt = "
            Anda adalah Campaign Creator NGO profesional.

            Berdasarkan ide berikut:

            {$this->data['prompt']}

            Tentukan durasi campaign yang realistis.

            Kembalikan JSON VALID tanpa markdown:

            {
                \"title\": \"\",
                \"short_description\": \"\",
                \"description\": \"\",
                \"target_amount\": 0,
                \"duration_days\": 90
            }
        ";

        $response = app(ClaudeService::class)
            ->ask($prompt);

        $response = trim($response);

        $response = preg_replace('/```json|```/', '', $response);

        $campaignData = json_decode($response, true);

        if (! $campaignData) {

            Notification::make()
                ->title('AI gagal menghasilkan data campaign')
                ->danger()
                ->send();

            return;
        }

        dd($this->data['thumbnail']);

        $durationDays = $campaignData['duration_days'] ?? 90;
        $thumbnail = is_array($this->data['thumbnail'])
            ? ($this->data['thumbnail'][0] ?? null)
            : $this->data['thumbnail'];

        $campaign = Campaign::create([
            'title' => $campaignData['title'],
            'slug' => Str::slug($campaignData['title']) . '-' . time(),

            'thumbnail' => $thumbnail,

            'short_description' =>
                $campaignData['short_description'],

            'description' =>
                $campaignData['description'],

            'target_amount' =>
                $campaignData['target_amount'],

            'collected_amount' => 0,

            'is_active' => false,

            'start_date' => now(),

            'end_date' => now()->addDays($durationDays),
        ]);

        Notification::make()
            ->title('Campaign berhasil dibuat')
            ->success()
            ->send();

        $this->conversations[] = [
            'question' => $this->data['prompt'],
            'answer' => 'Campaign berhasil dibuat: ' . $campaign->title,
            'created_at' => now()->format('H:i:s'),
        ];

        $this->data['prompt'] = '';
    }
}
