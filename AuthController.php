<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Resources\RoleResource;
use App\Models\AccountClient;
use App\Http\Resources\AccountResource;

use JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup', 'getuser']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

  

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password does\'t exist'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function signup(SignUpRequest $request)
    {
        User::create($request->all());
        return $this->login($request);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
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

    public function getusers()
    {
 
       $users = JWTAuth::parseToken()->authenticate();
       
       $userRole = $users->roles()->first()->name;
       $accountId = $users->account_id;
       
      
       
       if($userRole == 'sysadmin'){

           return UserResource::collection(User::with('superadminaccounts')->get()); 

       }else if($userRole == 'superadmin'){

          return UserResource::collection(User::with('superadminaccounts')->where('account_id', $accountId)->get());

       }else if($userRole == 'admin'){

       $ausers = User::with(['superadminaccounts'])
                ->where('account_id', $users->account_id)
                ->get();
       
       $puser = $ausers->filter(function($user, $item) {
           $role = $user->roles()->first();

           if( ($role->name == 'admin') || ($role->name == 'user') ) {
              return true;
           }
           return false;
       });

       return UserResource::collection( $puser);

       }else{

             return UserResource::collection(User::with('superadminaccounts')->where('id', $users->id)->get());
       }



       // $query = User::with('role');
       /* if($request->filled('search')){
           $query->where('first_name', 'like', $request->input('search').'%')
                 ->orWhere('last_name', 'like', $request->input('search').'%');
        } */
        

    }


    public function getUser(){

        $users = JWTAuth::parseToken()->authenticate();

        return response()->json([
            'user' => $users->name,
            'id' => $users->id,
            'role' => $users->roles()->first()->name,
            'accountid' => $users->account_id
        ]);

    }
 
    public function getClientAccount(){

       return AccountResource::collection(AccountClient::get()); 
    }

    public function destroy($id)
    {
		User::find($id)->delete();
		return response()->json([
            'status' => 'success'
        ]);
    }
 
}
