<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FiberCabinet extends Model
{
    protected $table = 'fiber_cabinets';
    protected $primaryKey = 'cabinet_code';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['cabinet_code', 'fault_location'];

    // Enforce upper-case business rule on cabinet code assignment
    public function setCabinetCodeAttribute($value)
    {
        $this->attributes['cabinet_code'] = strtoupper($value);
    }

    public function repairTickets(): HasMany
    {
        return $this->hasMany(RepairTicket::class, 'cabinet_code', 'cabinet_code');
    }
}
