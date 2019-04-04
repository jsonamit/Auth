<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('register', 'Auth\UserRegisterController');
Route::post('register/{id}', 'Auth\UserRegisterController@update');

Route::post('customers/login', 'UserController@login');

Route::post('login', 'Auth\AuthController@login');
Route::apiResource('users', 'Auth\AuthController');
Route::get('users', 'Auth\AuthController@getusers');
Route::get('user', 'Auth\AuthController@getUser');
Route::get('clients', 'Auth\AuthController@getClientAccount');



Route::post('category/{id}', 'CategoryController@update');
Route::apiResource('category', 'CategoryController');

Route::post('addfield', 'BadgeFieldController@addfield');
Route::post('addprojectfields', 'BadgeFieldController@addprojectfields');
Route::post('field/{id}', 'BadgeFieldController@update');
Route::apiResource('field', 'BadgeFieldController');
Route::get('getfield/{id}', 'BadgeFieldController@getfield');

Route::apiResource('addproject', 'ProjectController');
Route::post('uploadlogo', 'ProjectController@uploadlogo');
Route::post('updateproject', 'ProjectController@updateproject');

//Route::get('getprojectvalue', 'ProjectController@getprojectvalue');
//Route::get('getprojectvaluebyid/{id}', 'ProjectController@getprojectvaluebyid');
//Route::post('createprojectvalue', 'ProjectController@createprojectvalue');
//Route::post('updateprojectvalue', 'ProjectController@updateprojectvalue');


