<?php

namespace App\Filament\Resources\Transactions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class TransactionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('invoice_number')
                ->sortable(),

                TextColumn::make('name')
                    ->sortable(),

                TextColumn::make('grand_total')
                    ->sortable(),

                TextColumn::make('payment_gateway')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('transaction_status')
                    ->sortable()
                
                ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
