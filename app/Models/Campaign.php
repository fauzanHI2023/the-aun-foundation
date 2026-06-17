<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
