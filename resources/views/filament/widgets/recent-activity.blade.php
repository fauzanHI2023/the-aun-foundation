    <x-filament-widgets::widget>
        <x-filament::section class="glass">
            <x-slot name="heading">
                <span class="font-serif text-lg italic text-[#e8e3d9]">Aktivitas Terakhir</span>
            </x-slot>
            <x-slot name="headerEnd">
                {{-- Sesuaikan nama resource & panel id (mis. "admin") dengan punyamu --}}
                <a href="{{ route('filament.admin.resources.transactions.index') }}"
                class="font-mono text-[11px] tracking-wider text-[#d97706] hover:underline">
                    LIHAT SEMUA
                </a>
            </x-slot>

            <div class="space-y-4">
                @foreach ($this->getActivities() as $a)
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#d97706]/10 text-[#d97706]">
                                <x-heroicon-o-check-circle class="h-5 w-5" />
                            </span>
                            <div>
                                <p class="text-sm font-medium italic text-white">
                                    <span class="font-semibold">No. Inovice | </span>
                                    {{ $a['title'] }}
                                </p>
                                <p class="font-medium text-[11px] text-[#b9ab99]">{{ $a['donor'] }} • {{ $a['time'] }}</p>
                            </div>
                        </div>
                        <p class="text-sm text-white/80">Rp {{ $a['amount'] }}</p>
                    </div>
                @endforeach
            </div>
        </x-filament::section>
    </x-filament-widgets::widget>
