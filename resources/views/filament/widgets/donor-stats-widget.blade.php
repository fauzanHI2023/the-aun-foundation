<x-filament-widgets::widget>
    <x-filament::section class="glass">
        <div class="flex flex-col gap-4 h-[320px]">
            {{-- Dana Terkumpul --}}
            <div>
                <p class="text-lg font-medium text-white">
                    Dana Terkumpul (Total)
                </p>
                <h3 class="text-5xl font-medium text-[#b9ab99]">
                    Rp {{ number_format($total, 0, ',', '.') }}
                </h3>
                <p class="text-xs {{ $changePercent >= 0 ? 'text-success-600' : 'text-danger-600' }}">
                    {{ $changePercent >= 0 ? '▲' : '▼' }} {{ abs($changePercent) }}% vs last month
                </p>
            </div>

            <div class="grid grid-cols-2 gap-5">
            {{-- Donatur --}}
            <div class="bg-black rounded-2xl px-8 py-10">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 pb-2">
                    Donatur
                </p>
                <p class="text-2xl font-semibold text-warning-500">
                    {{ number_format($donorCount) }}
                </p>
            </div>

            {{-- Campaign --}}
            <div class="bg-black rounded-2xl px-8 py-10">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400 pb-2">
                    Campaign
                </p>
                <p class="text-2xl font-semibold text-warning-500">
                    {{ number_format($campaignCount) }}
                </p>
            </div>
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>