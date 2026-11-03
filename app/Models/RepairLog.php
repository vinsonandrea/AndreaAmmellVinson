<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairLog extends Model
{
    protected $table = 'repair_logs';
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'ticket_id',
        'repair_start',
        'repair_end',
        'splice_count',
        'repair_cost'
    ];

    public function repairTicket(): BelongsTo
    {
        return $this->belongsTo(RepairTicket::class, 'ticket_id', 'ticket_id');
    }
}