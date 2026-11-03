<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RepairTicket extends Model
{
    protected $table = 'repair_tickets';
    protected $primaryKey = 'ticket_id';

    protected $fillable = [
        'subscriber_account',
        'cabinet_code',
        'team_id',
        'reported_issue',
        'ticket_status'
    ];

    // Strip HTML tags automatically when setting reported issue
    public function setReportedIssueAttribute($value)
    {
        $this->attributes['reported_issue'] = strip_tags($value);
    }

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class, 'subscriber_account', 'subscriber_account');
    }

    public function fiberCabinet(): BelongsTo
    {
        return $this->belongsTo(FiberCabinet::class, 'cabinet_code', 'cabinet_code');
    }

    public function technicianTeam(): BelongsTo
    {
        return $this->belongsTo(TechnicianTeam::class, 'team_id', 'team_id');
    }

    public function repairLog(): HasOne
    {
        return $this->hasOne(RepairLog::class, 'ticket_id', 'ticket_id');
    }
}
