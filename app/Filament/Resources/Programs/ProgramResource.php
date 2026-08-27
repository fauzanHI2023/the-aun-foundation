<?php

namespace App\Filament\Resources\Programs;

use App\Filament\Resources\Programs\Pages\CreateProgram;
use App\Filament\Resources\Programs\Pages\EditProgram;
use App\Filament\Resources\Programs\Pages\ListPrograms;
use App\Filament\Resources\Programs\Schemas\ProgramForm;
use App\Filament\Resources\Programs\Tables\ProgramsTable;
use App\Models\Program;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\RichEditor;
use Filament\Actions\Action;

class ProgramResource extends Resource
{
    protected static ?string $model = Program::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::QueueList;

    protected static ?string $recordTitleAttribute = 'program';

    public static function form(Schema $schema): Schema
    {
        return $schema
        ->schema([
            Forms\Components\TextInput::make('title_program')
                ->required(),

            Forms\Components\TextInput::make('focus')
                ->required(),

            Forms\Components\FileUpload::make('thumbnail')
                ->image()
                ->disk('public')
                ->directory('images/program')
                ->visibility('public')
                ->maxSize(10240)
                ->columnSpanFull()
                ->required(),
            
            Forms\Components\RichEditor::make('description')
                ->required()
                ->columnSpanFull(),
            
            Forms\Components\TextInput::make('goals')
                ->required(),

            Forms\Components\TextInput::make('collected'),

            Forms\Components\Select::make('program_type')
                ->options([
                    'community_facilities' => 'Community Facilities',
                    'education_knowledge' => 'Education & Knowledge',
                    'economic_empowerment' => 'Economic Empowerment',
                    'seasonal' => 'Seasonal Program',
                ])
                ->required()
                ->native(false),
            
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('title_program')
                ->sortable(),

            Tables\Columns\TextColumn::make('focus')
                ->sortable(),

            Tables\Columns\TextColumn::make('description')
                ->label('Description')
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
            'index' => ListPrograms::route('/'),
            'create' => CreateProgram::route('/create'),
            'edit' => EditProgram::route('/{record}/edit'),
        ];
    }
}
