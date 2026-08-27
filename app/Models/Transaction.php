<?php

namespace App\Models;

use App\Models\InvoiceCounter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    protected $fillable = [

        'invoice_number',

        'reference_no',
        
        'payment_url',

        'user_id',

        'name',

        'email',

        'phone',

        'grand_total',

        'payment_method',

        'payment_channel',

        'transaction_status',

        'snap_token',

        'payment_response',

        'paid_at',

        'va_bank_channel',
        
        'va_customer_no',
        
        'va_number',
        
        'va_expired_at',

        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'paid_at' => 'datetime',
            'created_at' => 'datetime',
            'expires_at' => 'datetime',
            'grand_total' => 'float',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    public static function generateInvoiceNumber(string $prefix = 'AUN', string $suffix = 'W'): string
    {
        $today = now()->toDateString();
        $datePart = now()->format('mdy'); // MMDDYY

        $nextSequence = DB::transaction(function () use ($today) {
            $counter = InvoiceCounter::where('date', $today)->lockForUpdate()->first();

            if (! $counter) {
                try {
                    $counter = InvoiceCounter::create([
                        'date' => $today,
                        'last_sequence' => 0,
                    ]);
                } catch (QueryException $e) {
                    // race condition: request lain sudah bikin row ini duluan
                    $counter = InvoiceCounter::where('date', $today)->lockForUpdate()->first();
                }
            }

            $next = $counter->last_sequence + 1;
            $counter->update(['last_sequence' => $next]);

            return $next;
        });

        $sequence = str_pad($nextSequence, 4, '0', STR_PAD_LEFT);

        return "{$prefix}{$sequence}{$datePart}{$suffix}";
    }

    public static function mapDoitpayStatus(string $doitpayStatus): string
    {
        return match ($doitpayStatus) {
            '00' => 'success',
            '01' => 'initiated',
            '02' => 'failed',
            '04' => 'expired',
            default => 'initiated',
        };
    }
    
}
