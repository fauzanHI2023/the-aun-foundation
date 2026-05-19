<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    protected $fillable = [

        'invoice_number',

        'user_id',

        'name',

        'email',

        'phone',

        'grand_total',

        'transaction_status',

        'snap_token',

        'payment_response',

        'paid_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
