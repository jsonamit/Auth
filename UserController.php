<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Hash;

use JWTAuth;

class UserController extends Controller
{
    
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
    }

    private function validationRules(Request $request)
    {
        return $this->validate(
            $request, [
              'first_name' => ['required', 'string', 'max:255'],
              'email' => ['required', 'string', 'email', 'max:255', 'unique:customers'],
              'password' => ['required', 'string', 'min:4'],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

	public function updatepass(Request $request)
	{
		  return response()->json(['error' => 'password does\'t exist'], 200);	
		  $users = JWTAuth::parseToken()->authenticate();
		  // print_r($users); die('abjdsj');

		  $userId = $users->id;

		  $emailId = $users->email;

		  $password = $request->input('oldpassword');
		 
		  $user = User::findOrFail($userId);

		
		 if(!Hash::check($password, $user->password)){ 
		 
		     return response()->json(['error' => 'password does\'t exist'], 401);
		 }
		 else
		 {

		              				$user->fill([
							      'password' => $request->input('newpassword')
							    ]);

						      //$user->save();		

						      return response()->json([
							    'success' => 'password successfully updated'
							]);
		 }

		  
    }

    public function login()
    {

        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password does\'t exist'], 401);
        }

        return $this->respondWithToken($token);
  
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->name,
            'id' => auth()->user()->id,
            'role' => auth()->user()->roles()->first()->name
        ]);
    }


}
