<?php

use App\Http\Controllers\PostalCodeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::group(
    ['prefix' => 'v1'],
    function () {

        Route::get('/test', function () {
            return "API OK! 😉";
        });

        // get postal codes
        Route::get('/all', [PostalCodeController::class, 'index']);
        Route::get('/search', [PostalCodeController::class, 'search']); // add {params}
    }
);
