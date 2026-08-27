<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'title_program',
        'focus',
        'description',
        'img_slide_1',
        'img_slide_2',
        'img_slide_3',
        'target_groups',
        'key_components',
        'outcome',
        'goals',
        'thumbnail',
        'collected',
        'program_type'
    ];
    
}
