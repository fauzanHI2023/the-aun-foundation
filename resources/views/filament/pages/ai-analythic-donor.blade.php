<x-filament-panels::page>

    <div class="space-y-6">

        <x-filament::section
            heading="AI Campaign Generator"
            description="Masukkan ide campaign dan AI akan membuat campaign baru secara otomatis."
        >

            {{ $this->form }}

            <div class="mt-4">
                <x-filament::button
                    wire:click="ask"
                    icon="heroicon-o-sparkles"
                >
                    Generate Campaign
                </x-filament::button>
            </div>

        </x-filament::section>

        @if(count($this->conversations))
            <x-filament::section
                heading="Generated Campaigns"
            >

                <div class="space-y-4">

                    @foreach($this->conversations as $item)

                        <div
                            class="rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                        >
                            <div class="mb-2">
                                <span class="font-semibold text-primary-600">
                                    Prompt:
                                </span>

                                <p class="mt-1">
                                    {{ $item['question'] }}
                                </p>
                            </div>

                            <div>
                                <span class="font-semibold text-success-600">
                                    Result:
                                </span>

                                <p class="mt-1">
                                    {{ $item['answer'] }}
                                </p>
                            </div>

                            <div class="mt-2 text-xs text-gray-500">
                                {{ $item['created_at'] }}
                            </div>
                        </div>

                    @endforeach

                </div>

            </x-filament::section>
        @endif

    </div>

</x-filament-panels::page>