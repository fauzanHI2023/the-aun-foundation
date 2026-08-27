<x-filament-widgets::widget>
    <div class="flex items-center gap-6 overflow-hidden rounded-lg border border-white/10 glass px-6 py-3">
        <div class="flex shrink-0 items-center gap-2 font-mono text-[11px] leading-tight tracking-[0.15em] text-[#d97706]">
            <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d97706] opacity-75"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-[#d97706]"></span>
            </span>
            LIVE<br>DATA<br>SIGNAL
        </div>

        <div class="relative flex-1 overflow-hidden">
            <div class="flex w-max animate-[folio-marquee_30s_linear_infinite] gap-10 whitespace-nowrap">
                @foreach ($this->getSignals()->concat($this->getSignals()) as $signal)
                    <span class="font-mono text-xs text-white/60">
                        <span class="text-white/90">{{ $signal['amount'] }}</span> — {{ $signal['label'] }}
                        <span class="text-white/30">• {{ $signal['time'] }}</span>
                    </span>
                @endforeach
            </div>
        </div>
    </div>

    <style>
        @keyframes folio-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
    </style>
</x-filament-widgets::widget>
