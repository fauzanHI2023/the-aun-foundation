<x-filament-panels::page>

        {{ $this->form }}

        <div class="mt-4">
            <x-filament::button wire:click="ask">
                Analyze Campaigns
            </x-filament::button>
        </div>

        @if(count($this->conversations ?? []))
            <div class="mt-6 space-y-6 flex flex-col gap-6">

                @foreach($this->conversations as $chat)


                    <x-filament::section class="bg-gray-400">

                        <div class="space-y-4">

                            <div>
                                <div class="font-semibold text-primary-600">
                                    Question
                                </div>

                                <div class="mt-1">
                                    {{ $chat['question'] }}
                                </div>
                            </div>
                        </div>
                    </x-filament::section>

                    <x-filament::section>

                            <div>
                                <div class="font-semibold text-success-600">
                                    AI Answer
                                </div>

                                <div class="mt-1 prose max-w-none">
                                    {!! nl2br(e($chat['answer'])) !!}
                                </div>
                            </div>

                            <div class="text-xs text-gray-500">
                                {{ $chat['created_at'] }}
                            </div>

                    </x-filament::section>

                @endforeach

            </div>
        @endif

</x-filament-panels::page>