<?php

namespace App\Http\Requests;

use App\Enum\CollectionLang;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class PostalCodeGetRequest extends FormRequest
{
    public function rules()
    {
        return [
            "keyword" => ['required', 'string'],
            "lang" => [
                'required', 'string',
                Rule::in(CollectionLang::$langauges)
            ],
        ];
    }
}
