<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $fillable = [
        'judul',
        'slug',
        'ringkasan',
        'konten',
        'thumbnail',
        'banner',
        'home_post',
        'featured_post',
        'selected_post',
        'category',
        'is_published',
        'published_at'
    ];
}
