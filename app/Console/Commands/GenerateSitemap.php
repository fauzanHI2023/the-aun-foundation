<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Program; // sesuaikan dengan model Program kamu
use App\Models\Berita;    // sesuaikan dengan model News kamu

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate sitemap.xml untuk website AUN Foundation';

    public function handle()
    {
        $sitemap = Sitemap::create();

        // ==========================================
        // 1. HALAMAN STATIS
        // ==========================================
        $staticPages = [
            '/'              => 1.0,
            '/aboutus'         => 0.8,
            '/programs'      => 0.9,
            '/news'          => 0.9,
            '/contact'       => 0.7,
            '/donasi'        => 0.9,
            // tambahkan route statis lain di sini
        ];

        foreach ($staticPages as $path => $priority) {
            $sitemap->add(
                Url::create($path)
                    ->setPriority($priority)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // ==========================================
        // 2. HALAMAN DINAMIS - PROGRAM
        // Hanya ambil yang statusnya 'published'
        // ==========================================
        Program::all()
            ->each(function (Program $program) use ($sitemap) {
                $sitemap->add(
                    Url::create("/programs/{$program->slug}")
                        ->setLastModificationDate($program->updated_at)
                        ->setPriority(0.8)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                );
            });

        // ==========================================
        // 3. HALAMAN DINAMIS - NEWS
        // Hanya ambil yang statusnya 'published'
        // ==========================================
        Berita::where('is_published', 1)
            ->get()
            ->each(function (Berita $berita) use ($sitemap) {
                $sitemap->add(
                    Url::create("/news/{$berita->slug}")
                        ->setLastModificationDate($berita->updated_at)
                        ->setPriority(0.7)
                        ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                );
            });

        // Simpan ke public/sitemap.xml
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap berhasil dibuat di public/sitemap.xml');
    }
}