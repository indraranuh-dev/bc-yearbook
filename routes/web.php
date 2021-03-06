<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);

Route::group([
        'prefix' => '/',
        'as' => 'landing.'
    ], function () {

    #Route Landing Page
    Route::get('/', 'Landing\LandingPageController@index')->name('index');
});

Route::get('/home', 'HomeController@index')->middleware('verified')->name('home');