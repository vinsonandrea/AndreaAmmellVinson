<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FiberCabinetRequest extends FormRequest
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
            'cabinet_code' => $cleanCode($this->input('cabinet_code')),
            'cabinet_type' => $cleanText($this->input('cabinet_type')),
            'fault_location' => $cleanText($this->input('fault_location')),
        ]);
    }

    public function rules(): array
    {
        $uniqueCode = Rule::unique('fiber_cabinets', 'cabinet_code');
        $cabinet = $this->route('fiberCabinet');

        if ($cabinet) {
            $uniqueCode->ignore($cabinet->getKey(), 'cabinet_code');
        }

        return [
            'cabinet_code' => ['required', 'string', 'max:255', $uniqueCode],
            'cabinet_type' => ['required', 'string', 'max:255'],
            'fault_location' => ['required', 'string', 'max:255'],
        ];
    }
}