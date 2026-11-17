<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepairTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $cleanText = fn ($value) => is_string($value) ? trim(strip_tags($value)) : $value;
        $cleanCode = fn ($value) => is_string($value) ? strtoupper($cleanText($value)) : $value;

        $this->merge([
            'subscriber_account' => $cleanCode($this->input('subscriber_account')),
            'cabinet_code' => $cleanCode($this->input('cabinet_code')),
            'technician_team' => $cleanText($this->input('technician_team')),
            'reported_issue' => $cleanText($this->input('reported_issue')),
        ]);
    }

    public function rules(): array
    {
        return [
            'subscriber_account' => ['required', 'string', 'exists:subscribers,subscriber_account'],
            'cabinet_code' => ['required', 'string', 'exists:fiber_cabinets,cabinet_code'],
            'technician_team' => ['required', 'string', 'max:255'],
            'reported_issue' => ['required', 'string', 'max:10000'],
            'ticket_status' => ['required', 'string', 'in:Open,Assigned,In Progress,Resolved,Closed'],
            'repair_start' => ['nullable', 'date'],
            'repair_end' => ['nullable', 'date', 'after_or_equal:repair_start'],
            'labor_hours' => ['nullable', 'numeric', 'min:0'],
            'splice_count' => ['nullable', 'integer', 'min:0'],
        ];
    }
}