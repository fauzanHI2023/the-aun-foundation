<x-filament-widgets::widget>
    <x-filament::section class="glass">
        <x-slot name="heading">
            <h3 class="text-xl text-surface">Metode Pembayaran</h3>
        </x-slot>

        <div class="space-y-4">
            @foreach ($this->getMethods() as $method)
                <div>
                    <div class="mb-1.5 flex items-center justify-between font-mono text-[11px] tracking-wider text-white/50">
                        <span>{{ $method['label'] }}</span>
                        <span class="text-[#d97706]">{{ number_format($method['percent'], 2) }}%</span>
                    </div>
                    <div class="h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div class="h-full rounded-full bg-[#d97706]" style="width: {{ $method['percent'] }}%"></div>
                    </div>
                </div>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
