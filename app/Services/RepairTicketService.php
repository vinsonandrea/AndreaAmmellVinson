<?php

namespace App\Services;

use App\Models\RepairTicket;
use App\Models\TechnicianTeam;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class RepairTicketService
{
    public function count(): int
    {
        return RepairTicket::query()->count();
    }

    public function getRecords(): Collection
    {
        return RepairTicket::query()
            ->with(['subscriber', 'fiberCabinet', 'technicianTeam'])
            ->latest('created_at')
            ->get();
    }

    public function find(int $ticketId): RepairTicket
    {
        return RepairTicket::query()
            ->with(['subscriber', 'fiberCabinet', 'technicianTeam', 'repairLog'])
            ->findOrFail($ticketId);
    }

    public function create(array $data): RepairTicket
    {
        $data = $this->applyBusinessRules($data);
        $repairLog = $this->extractRepairLog($data);
        $ticket = RepairTicket::create($data);
        $this->syncRepairLog($ticket, $repairLog);

        return $ticket;
    }

    public function update(RepairTicket $repairTicket, array $data): RepairTicket
    {
        $data = $this->applyBusinessRules($data);
        $repairLog = $this->extractRepairLog($data);
        $repairTicket->update($data);
        $this->syncRepairLog($repairTicket, $repairLog);

        return $repairTicket->refresh();
    }

    public function delete(RepairTicket $repairTicket): void
    {
        $repairTicket->delete();
    }

    private function applyBusinessRules(array $data): array
    {
        $data = $this->sanitize($data);
        $teamName = $this->cleanText($data['technician_team'] ?? null);

        if ($teamName === '') {
            throw ValidationException::withMessages([
                'technician_team' => 'A technician team is required.',
            ]);
        }

        $data['team_id'] = TechnicianTeam::firstOrCreate(['technician_team' => $teamName])->team_id;
        unset($data['technician_team']);

        return $data;
    }

    private function sanitize(array $data): array
    {
        $data = array_intersect_key($data, array_flip([
            'subscriber_account',
            'cabinet_code',
            'technician_team',
            'reported_issue',
            'ticket_status',
            'repair_start',
            'repair_end',
            'labor_hours',
            'splice_count',
        ]));

        foreach (['technician_team', 'reported_issue', 'ticket_status'] as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = $this->cleanText($data[$field]);
            }
        }

        foreach (['subscriber_account', 'cabinet_code'] as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = strtoupper($this->cleanText($data[$field]));
            }
        }

        foreach (['repair_start', 'repair_end'] as $field) {
            if (array_key_exists($field, $data)) {
                $data[$field] = $this->cleanNullableText($data[$field]);
            }
        }

        return $data;
    }

    private function extractRepairLog(array &$data): array
    {
        $log = [
            'repair_start' => $this->cleanNullableText($data['repair_start'] ?? null),
            'splice_count' => (int) ($data['splice_count'] ?? 0),
            'labor_hours' => (float) ($data['labor_hours'] ?? 0),
        ];

        unset($data['repair_start'], $data['splice_count'], $data['labor_hours']);

        if (($data['ticket_status'] ?? '') === 'Resolved') {
            $log['repair_end'] = $this->cleanNullableText($data['repair_end'] ?? null) ?? now();
        } else {
            $log['repair_end'] = null;
        }

        unset($data['repair_end']);
        $log['repair_cost'] = $this->calculateRepairCost($log['labor_hours'], $log['splice_count']);

        return $log;
    }

    private function calculateRepairCost(float $laborHours, int $spliceCount): float
    {
        return round(
            ($laborHours * config('fiber-optic.labor_rate_per_hour'))
                + ($spliceCount * config('fiber-optic.splice_rate')),
            2
        );
    }

    private function syncRepairLog(RepairTicket $ticket, array $data): void
    {
        $ticket->repairLog()->updateOrCreate(['ticket_id' => $ticket->ticket_id], $data);
    }

    private function cleanText(mixed $value): string
    {
        return is_string($value) ? trim(strip_tags($value)) : '';
    }

    private function cleanNullableText(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        return is_string($value) ? (trim(strip_tags($value)) ?: null) : null;
    }
}
