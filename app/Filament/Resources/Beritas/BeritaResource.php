<?php

namespace App\Filament\Resources\Beritas;

use App\Filament\Resources\Beritas\Pages\CreateBerita;
use App\Filament\Resources\Beritas\Pages\EditBerita;
use App\Filament\Resources\Beritas\Pages\ListBeritas;
use App\Filament\Resources\Beritas\Schemas\BeritaForm;
use App\Filament\Resources\Beritas\Tables\BeritasTable;
use App\Models\Berita;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Actions\Action;

class BeritaResource extends Resource
{
    protected static ?string $model = Berita::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'berita';

    public static function form(Schema $schema): Schema
    {
        return $schema
        ->schema([
            Forms\Components\TextInput::make('judul')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) => 
                    $set('slug', \Str::slug($state))
                ),

            Forms\Components\Select::make('category')
                ->options([
                    'education' => 'Education',
                    'health' => 'Health',
                    'protection' => 'Protection',
                    'environment' => 'Environment',
                ])
                ->required()
                ->native(false),
            
            Forms\Components\TextInput::make('slug')
                ->required(),
            
            Forms\Components\TextInput::make('ringkasan')
                ->required(),

            Forms\Components\RichEditor::make('konten')
                ->required()
                ->fileAttachmentsDisk('public')
                ->fileAttachmentsDirectory('images/berita')
                ->columnSpanFull(),

            Forms\Components\FileUpload::make('thumbnail')
                ->image()
                ->disk('public')
                ->directory('images/berita')
                ->visibility('public')
                ->maxSize(10240)
                ->required(),
            
            Forms\Components\FileUpload::make('banner')
                ->image()
                ->disk('public')
                ->directory('images/berita')
                ->visibility('public')
                ->maxSize(10240)
                ->required(),

            Forms\Components\Toggle::make('home_post')
                ->label('Home News Post Utama')
                ->default(false),

            Forms\Components\Toggle::make('featured_post')
                ->label('Featured Post')
                ->default(false),

            Forms\Components\Toggle::make('selected_post')
                ->label('Selected Post')
                ->default(false),

            Forms\Components\Toggle::make('is_published')
                ->label('Publish')
                ->default(false),
            
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('judul')
                ->sortable(),

            Tables\Columns\TextColumn::make('category')
                ->sortable(),

            Tables\Columns\TextColumn::make('slug')
                ->sortable()
                ->searchable(),

            Tables\Columns\TextColumn::make('selected_post')
                ->sortable()
                ->searchable(),

            Tables\Columns\TextColumn::make('is_published')
                ->sortable()
                ->searchable(),

        ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBeritas::route('/'),
            'create' => CreateBerita::route('/create'),
            'edit' => EditBerita::route('/{record}/edit'),
        ];
    }
}
