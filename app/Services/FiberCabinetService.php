<?php

namespace App\Services;

use App\Models\FiberCabinet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class FiberCabinetService
{
    public function count(): int
    {
        return FiberCabinet::query()->count();
    }

    public function getRecords(): Collection
    {
        return FiberCabinet::query()->orderBy('cabinet_code')->get();
    }

    public function find(string $cabinetCode): FiberCabinet
    {
        return FiberCabinet::query()
            ->with('repairTickets')
            ->findOrFail($cabinetCode);
    }

    public function create(array $data): FiberCabinet
    {
        return FiberCabinet::create($this->sanitize($data));
    }

    public function update(FiberCabinet $fiberCabinet, array $data): FiberCabinet
    {
        $fiberCabinet->update($this->sanitize($data));

        return $fiberCabinet->refresh();
    }

    public function delete(FiberCabinet $fiberCabinet): void
    {
        $fiberCabinet->delete();
    }

    private function sanitize(array $data): array
    {
        return [
            'cabinet_code' => strtoupper($this->cleanText($data['cabinet_code'] ?? null)),
            'cabinet_type' => $this->cleanText($data['cabinet_type'] ?? null),
            'fault_location' => $this->cleanText($data['fault_location'] ?? null),
        ];
    }

    private function cleanText(mixed $value): string
    {
        // return is_string($value) ? trim(strip_tags($value)) : '';
        return Str::of($value)->stripTags()->trim()->toString();
    }
}
