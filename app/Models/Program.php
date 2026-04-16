<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'title_program',
        'focus',
        'description',
        'target_groups',
        'key_components',
        'outcome',
    ];
    
}
