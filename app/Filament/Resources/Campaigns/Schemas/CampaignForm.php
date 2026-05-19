<?php

namespace App\Filament\Resources\Campaigns\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DatePicker;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CampaignForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Campaign Information')
                    ->schema([

                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set) {

                                $set(
                                    'slug',
                                    Str::slug($state)
                                );
                            })
                            ->maxLength(255),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        Textarea::make('short_description')
                            ->rows(3)
                            ->columnSpanFull(),

                        RichEditor::make('description')
                            ->columnSpanFull(),

                    ])
                    ->columns(2),

                Section::make('Thumbnail')
                    ->schema([

                        FileUpload::make('thumbnail')
                            ->image()
                            ->directory('campaigns')
                            ->disk('public'),

                    ]),

                Section::make('Donation')
                    ->schema([

                        TextInput::make('target_amount')
                            ->numeric()
                            ->prefix('Rp')
                            ->required(),

                        TextInput::make('collected_amount')
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0)
                            ->disabled(),

                    ])
                    ->columns(2),

                Section::make('Publish')
                    ->schema([

                        DatePicker::make('start_date'),

                        DatePicker::make('end_date'),

                        Toggle::make('is_active')
                            ->default(true),

                    ])
                    ->columns(3),

            ]);
        
    }
}
