<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubscriberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $name = $this->input('subscriber_name');
        $account = $this->input('subscriber_account');

        $cleaned = [];

        if (is_string($name)) {
            $cleaned['subscriber_name'] = trim(strip_tags($name));
        }

        if (is_string($account)) {
            $cleaned['subscriber_account'] = strtoupper(trim(strip_tags($account)));
        }

        $this->merge($cleaned);
    }

    public function rules(): array
    {
        $uniqueAccount = Rule::unique('subscribers', 'subscriber_account');
        $subscriber = $this->route('subscriber');

        if ($subscriber) {
            $uniqueAccount->ignore($subscriber->getKey(), 'subscriber_account');
        }

        return [
            'subscriber_account' => ['required', 'string', 'max:255', $uniqueAccount],
            'subscriber_name' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'subscriber_account.required' => 'The subscriber account number is required.',
            'subscriber_name.required' => 'The customer name is required.',
        ];
    }
}