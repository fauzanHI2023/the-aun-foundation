<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['name','industry','employee_count','annual_revenue','size_category','logo','website'];

    public function donors() { return $this->hasMany(Donor::class); }

    public function scopeBig($query)
    {
        return $query->whereIn('size_category', ['large','enterprise']);
    }

    public function totalDonations()
    {
        return Transaction::whereHas('donor', fn($q) => $q->where('company_id', $this->id))
            ->where('transaction_status', 'success')
            ->sum('amount');
    }
}
