<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Subscriber extends Model
{
    protected $table = 'subscribers';
    protected $primaryKey = 'subscriber_account';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['subscriber_account', 'subscriber_name'];

    // Enforce upper-case business rule on account number assignment
    public function setSubscriberAccountAttribute($value)
    {
        $this->attributes['subscriber_account'] = strtoupper($value);
    }

    public function repairTickets(): HasMany
    {
        return $this->hasMany(RepairTicket::class, 'subscriber_account', 'subscriber_account');
    }
    public function ScopeSearch(
        Builder $query,
        ?String $search
    ): Builder
    {return $query->when(filled($search), function (Builder $query) use ($search) {
            return $query->where('subscriber_account', 'like', "%{$search}%")
                ->orWhere('subscriber_name', 'like', "%{$search}%");
        });
    }

    public function ScopeLatestFirst(Builder $query): Builder
    {
        return $query->orderBy('created_at', 'desc');
    }
}