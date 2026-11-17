<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RepairLogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $uniqueTicket = Rule::unique('repair_logs', 'ticket_id');
        $repairLog = $this->route('repairLog');

        if ($repairLog) {
            $uniqueTicket->ignore($repairLog->getKey(), 'log_id');
        }

        return [
            'ticket_id' => ['required', 'integer', 'exists:repair_tickets,ticket_id', $uniqueTicket],
            'repair_start' => ['nullable', 'date'],
            'repair_end' => ['nullable', 'date', 'after_or_equal:repair_start'],
            'labor_hours' => ['nullable', 'numeric', 'min:0'],
            'splice_count' => ['nullable', 'integer', 'min:0'],
            'notes' => ['nullable', 'string', 'max:10000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $notes = $this->input('notes');

        if (is_string($notes)) {
            $this->merge(['notes' => trim(strip_tags($notes))]);
        }
    }
}