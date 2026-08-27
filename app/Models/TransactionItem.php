<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    protected $fillable = [

        'transaction_id',

        'campaign_id',

        'campaign_title',

        'amount',

        'quantity',

        'subtotal',
    ];
    
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
