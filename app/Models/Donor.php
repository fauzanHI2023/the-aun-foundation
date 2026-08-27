<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    protected $fillable = ['user_id','type','name','email','phone','company_id'];

    public function user() { return $this->belongsTo(User::class); }
    public function company() { return $this->belongsTo(Company::class); }
    public function donations() { return $this->hasMany(Transaction::class); }

    public function scopeCompanyDonors($query)
    {
        return $query->where('type', 'company');
    }
}
