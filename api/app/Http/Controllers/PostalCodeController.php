<?php

namespace App\Http\Controllers;

use App\Enum\CollectionLang;
use App\Http\Requests\PostalCodeGetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostalCodeController extends Controller
{
    protected $collection;

    public function index()
    {
        $postalCodes = DB::collection(CollectionLang::EN)
            ->take(10)
            ->get();

        return response()->json(['PostalCodes' => $postalCodes]);
    }

    public function search(PostalCodeGetRequest $request)
    {
        $trimmedKeyword = trim($request->keyword);

        if (!$trimmedKeyword) {
            return;
        }

        $this->setCollection($request->lang);

        $result = DB::collection($this->collection)
            ->where('Region', 'like', "%$trimmedKeyword%")
            ->orWhere('Town / Township', 'like', "%$trimmedKeyword%")
            ->orWhere('Quarter / Village Tract', 'like', "%$trimmedKeyword%")
            ->orWhere('Postal Code', 'like', "%$trimmedKeyword%")
            ->take(10)
            ->get();

        return response()->json(['result' => $result]);
    }

    private function setCollection($lang)
    {
        $lang = 'postal_codes_' . $lang;
        $this->collection = $lang === CollectionLang::MM ? CollectionLang::MM : CollectionLang::EN;
    }
}
