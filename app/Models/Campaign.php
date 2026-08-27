<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Campaign extends Model
{
    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class);
    }

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'thumbnail',
        'target_amount',
        'collected_amount',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->thumbnail
                ? asset('storage/'.$this->thumbnail)
                : null,
        );
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
