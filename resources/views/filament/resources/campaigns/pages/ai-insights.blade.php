<x-filament-panels::page>

    {{ $this->form }}

    <div class="mt-4">
        <x-filament::button wire:click="ask">
            Tanya AI
        </x-filament::button>
    </div>

    @if($answer)
        <div class="mt-6 p-4 bg-gray-100 rounded-lg">
            {!! nl2br(e($answer)) !!}
        </div>
    @endif

</x-filament-panels::page>