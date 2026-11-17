<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TechnicianTeam extends Model
{
    protected $table = 'technician_teams';
    protected $primaryKey = 'team_id';

    protected $fillable = ['technician_team'];

    public function repairTickets(): HasMany
    {
        return $this->hasMany(RepairTicket::class, 'team_id', 'team_id');
    }
}