<?php

namespace App\Services;

use App\Models\RepairLog;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class RepairLogService
{
    public function count(): int
    {
        return RepairLog::query()->count();
    }

    public function getRecords(): Collection
    {
        return RepairLog::query()
            ->with('repairTicket')
            ->latest('repair_start')
            ->get();
    }

    public function find(int $logId): RepairLog
    {
        return RepairLog::query()
            ->with([
                'repairTicket.subscriber',
                'repairTicket.fiberCabinet',
                'repairTicket.technicianTeam',
            ])
            ->findOrFail($logId);
    }

    public function create(array $data): RepairLog
    {
        $data = $this->sanitize($data);
        $laborHours = $data['labor_hours'] ?? 0;
        $spliceCount = $data['splice_count'] ?? 0;
        $data['repair_cost'] = $this->calculateRepairCost($laborHours, $spliceCount);

        return RepairLog::create($data);
    }

    public function update(RepairLog $repairLog, array $data): RepairLog
    {
        $data = $this->sanitize($data);
        $laborHours = $data['labor_hours'] ?? (float) $repairLog->labor_hours;
        $spliceCount = $data['splice_count'] ?? (int) $repairLog->splice_count;
        $data['repair_cost'] = $this->calculateRepairCost($laborHours, $spliceCount);
        $repairLog->update($data);

        return $repairLog->refresh();
    }

    public function delete(RepairLog $repairLog): void
    {
        $repairLog->delete();
    }

    private function sanitize(array $data): array
    {
        $sanitized = [];

        if (array_key_exists('ticket_id', $data)) {
            $sanitized['ticket_id'] = $this->integer($data['ticket_id'], 'ticket_id');
        }

        foreach (['repair_start', 'repair_end'] as $dateField) {
            if (array_key_exists($dateField, $data)) {
                $sanitized[$dateField] = $this->cleanNullableText($data[$dateField]);
            }
        }

        if (array_key_exists('labor_hours', $data)) {
            $sanitized['labor_hours'] = $data['labor_hours'] === null
                ? 0
                : $this->number($data['labor_hours'], 'labor_hours');
        }

        if (array_key_exists('splice_count', $data)) {
            $sanitized['splice_count'] = $data['splice_count'] === null
                ? 0
                : $this->integer($data['splice_count'], 'splice_count');
        }

        if (array_key_exists('notes', $data)) {
            $sanitized['notes'] = $this->cleanNullableText($data['notes']);
        }

        return $sanitized;
    }

    private function calculateRepairCost(float $laborHours, int $spliceCount): float
    {
        return round(
            ($laborHours * config('fiber-optic.labor_rate_per_hour'))
                + ($spliceCount * config('fiber-optic.splice_rate')),
            2
        );
    }

    private function integer(mixed $value, string $field): int
    {
        $integer = filter_var($value, FILTER_VALIDATE_INT);

        if ($integer === false || $integer < 0) {
            throw ValidationException::withMessages([
                $field => "The {$field} must be a non-negative integer.",
            ]);
        }

        return $integer;
    }

    private function number(mixed $value, string $field): float
    {
        if (! is_numeric($value) || (float) $value < 0) {
            throw ValidationException::withMessages([
                $field => "The {$field} must be a non-negative number.",
            ]);
        }

        return (float) $value;
    }

    private function cleanNullableText(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        if (! is_string($value)) {
            throw ValidationException::withMessages([
                'repair_log' => 'Repair log text fields must be strings.',
            ]);
        }

        $cleaned = trim(strip_tags($value));

        return $cleaned === '' ? null : $cleaned;
    }
}
