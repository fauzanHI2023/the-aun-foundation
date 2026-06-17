<?php

namespace App\Filament\Resources\ContactMessages;

use App\Filament\Resources\ContactMessages\Pages\CreateContactMessage;
use App\Filament\Resources\ContactMessages\Pages\EditContactMessage;
use App\Filament\Resources\ContactMessages\Pages\ListContactMessages;
use App\Filament\Resources\ContactMessages\Schemas\ContactMessageForm;
use App\Filament\Resources\ContactMessages\Tables\ContactMessagesTable;
use App\Models\ContactMessage;
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
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ChatBubbleBottomCenterText;

    protected static ?string $recordTitleAttribute = 'contact_messages';

    public static function form(Schema $schema): Schema
    {
        return ContactMessageForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            Tables\Columns\TextColumn::make('nama')
                ->sortable(),

            Tables\Columns\TextColumn::make('email')
                ->sortable(),

            Tables\Columns\TextColumn::make('subjek')
                ->sortable()
                ->searchable(),

            Tables\Columns\TextColumn::make('pesan')
                ->sortable()
                ->searchable(),
        ])
        ->headerActions([
            Action::make('export_csv')
                ->label('Export CSV')
                ->icon('heroicon-o-arrow-down-tray')
                ->action(function () {
                    return response()->streamDownload(function () {
                        $handle = fopen('php://output', 'w');

                        // header csv
                        fputcsv($handle, ['Name', 'Email', 'Organization', 'Message']);

                        // data
                        \App\Models\ContactMessage::chunk(100, function ($rows) use ($handle) {
                            foreach ($rows as $row) {
                                fputcsv($handle, [
                                    $row->nama,
                                    $row->email,
                                    $row->subjek,
                                    $row->pesan,
                                ]);
                            }
                        });

                        fclose($handle);
                    }, 'contact-messages.csv');
                })
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
            'index' => ListContactMessages::route('/'),
            'create' => CreateContactMessage::route('/create'),
            'edit' => EditContactMessage::route('/{record}/edit'),
        ];
    }
}
