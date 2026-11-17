<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TechnicianTeamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $team = $this->input('technician_team');

        if (is_string($team)) {
            $this->merge(['technician_team' => trim(strip_tags($team))]);
        }
    }

    public function rules(): array
    {
        return [
            'technician_team' => ['required', 'string', 'max:255'],
        ];
    }
}
