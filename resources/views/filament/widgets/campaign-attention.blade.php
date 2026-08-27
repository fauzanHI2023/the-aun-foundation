<x-filament-widgets::widget>
    <div class="flex items-center gap-3">
        <h3 class="text-xl italic font-bold text-[#e8e3d9]">Campaign Akan Berakhir </h3>
        <div class="h-px flex-1 bg-white/10"></div>
    </div>

    <div class="glass mt-4 grid grid-cols-2 gap-6">
        @foreach ($this->getCampaigns() as $c)
            <x-filament::section class="!bg-[#151414] dark:!bg-[#1c1b1b]">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <p class="mb-2 text-[10px] tracking-[0.15em] text-white/40">
                            {{ $c['category'] }}
                        </p>
                        <h4 class="font-serif text-xl leading-snug text-[#e8e3d9]">{{ $c['title_program'] }}</h4>
                    </div>

                    {{-- Progress ring dibuat murni CSS pakai conic-gradient, tanpa JS/SVG --}}
                    <div
                        class="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
                        style="background: conic-gradient(#d97706 {{ $c['percent'] * 3.6 }}deg, rgba(255,255,255,0.08) 0deg);"
                    >
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#0e0e0f] font-mono text-sm text-[#e8e3d9]">
                            {{ $c['percent'] }}%
                        </div>
                    </div>
                </div>

                <div class="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                    <div>
                        <p class="mb-1 font-mono text-[10px] tracking-wider text-white/40">TARGET</p>
                        <p class="text-sm text-white/80">Rp {{ $c['target'] }}</p>
                    </div>
                    <div>
                        <p class="mb-1 font-mono text-[10px] tracking-wider text-white/40">TERKUMPUL</p>
                        <p class="text-sm text-white/80">Rp {{ $c['collected_amount'] }}</p>
                    </div>
                    <div>
                        <p class="mb-1 font-mono text-[10px] tracking-wider text-white/40">SISA WAKTU</p>
                        <p class="text-sm text-[#d97706]">{{ $c['daysLeft'] }} Hari</p>
                    </div>
                </div>
            </x-filament::section>
        @endforeach
    </div>
</x-filament-widgets::widget>
