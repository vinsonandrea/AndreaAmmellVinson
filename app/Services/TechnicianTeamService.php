<?php

namespace App\Services;

use App\Models\TechnicianTeam;
use Illuminate\Database\Eloquent\Collection;

class TechnicianTeamService
{
    public function count(): int
    {
        return TechnicianTeam::query()->count();
    }

    public function getRecords(): Collection
    {
        return TechnicianTeam::query()->orderBy('technician_team')->get();
    }

    public function find(int $teamId): TechnicianTeam
    {
        return TechnicianTeam::query()
            ->with([
                'repairTickets.subscriber',
                'repairTickets.fiberCabinet',
            ])
            ->findOrFail($teamId);
    }

    public function create(array $data): TechnicianTeam
    {
        return TechnicianTeam::create($this->sanitize($data));
    }

    public function update(TechnicianTeam $technicianTeam, array $data): TechnicianTeam
    {
        $technicianTeam->update($this->sanitize($data));

        return $technicianTeam->refresh();
    }

    public function delete(TechnicianTeam $technicianTeam): void
    {
        $technicianTeam->delete();
    }

    private function sanitize(array $data): array
    {
        return [
            'technician_team' => is_string($data['technician_team'] ?? null)
                ? trim(strip_tags($data['technician_team']))
                : '',
        ];
    }
}
