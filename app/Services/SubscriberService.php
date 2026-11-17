<?php

namespace App\Services;

use App\Models\Subscriber;
use Illuminate\Database\Eloquent\Collection;

class SubscriberService
{
    public function count(): int
    {
        return Subscriber::query()->count();
    }

    public function getRecords(): Collection
    {
        return Subscriber::query()->orderBy('subscriber_account')->get();
    }

    public function find(string $subscriberAccount): Subscriber
    {
        return Subscriber::query()
            ->with('repairTickets')
            ->findOrFail($subscriberAccount);
    }

    public function nextAccountNumberPreview(): string
    {
        return $this->nextAccountNumber();
    }

    public function create(array $data): Subscriber
    {
        $data['subscriber_account'] = $this->cleanText($data['subscriber_account'] ?? null);

        return Subscriber::create($this->sanitize($data, creating: true));
    }

    public function update(Subscriber $subscriber, array $data): Subscriber
    {
        $subscriber->update($this->sanitize($data));

        return $subscriber->refresh();
    }

    public function delete(Subscriber $subscriber): void
    {
        $subscriber->delete();
    }

    private function nextAccountNumber(): string
    {
        $highest = Subscriber::query()
            ->pluck('subscriber_account')
            ->map(fn ($account) => (int) preg_replace('/\D/', '', (string) $account))
            ->max() ?? 10000;

        return 'SUB-' . ($highest + 1);
    }

    private function sanitize(array $data, bool $creating = false): array
    {
        $sanitized = [
            'subscriber_name' => $this->cleanText($data['subscriber_name'] ?? null),
        ];

        if ($creating || array_key_exists('subscriber_account', $data)) {
            $sanitized['subscriber_account'] = strtoupper($this->cleanText($data['subscriber_account'] ?? null));
        }

        return $sanitized;
    }

    private function cleanText(mixed $value): string
    {
        return is_string($value) ? trim(strip_tags($value)) : '';
    }
}
