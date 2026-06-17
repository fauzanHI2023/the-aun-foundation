<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ClaudeService
{
    public function ask(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openrouter.key'),
            'Content-Type' => 'application/json',
        ])->post(
            'https://openrouter.ai/api/v1/chat/completions',
            [
                'model' => 'anthropic/claude-sonnet-4',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'max_tokens' => 1000,
            ]
        );

        if (! $response->successful()) {
            return json_encode($response->json(), JSON_PRETTY_PRINT);
        }

        return data_get(
            $response->json(),
            'choices.0.message.content',
            'No response'
        );
    }
}