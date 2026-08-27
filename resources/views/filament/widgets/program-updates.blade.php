<x-filament-widgets::widget>
    <x-filament::section class="glass">
        <x-slot name="heading">
            <span class="font-serif text-lg italic text-[#e8e3d9]">Campaign Terbaru</span>
        </x-slot>

        <div class="space-y-6">
            @foreach ($this->getUpdates() as $u)
                <div class="flex gap-3">
                    <img src="{{ $u['imageUrl'] }}" alt="" class="h-14 w-14 shrink-0 rounded-md object-cover" />
                    <div>
                        <p class="text-sm leading-snug text-[#e8e3d9]">{{ $u['title'] }}</p>
                        <p class="mt-1 font-mono text-[10px] tracking-wider text-white/40">{{ $u['timeAgo'] }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
