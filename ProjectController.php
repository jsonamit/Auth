<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectFieldsValue;
use JWTAuth;
use File;
class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
			//
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $name=Project::where('name',$request->name)->first();
        if($name)
            {
                 return response()->json([
                   'message' => 'Project name already exists'
                 ]);
            }
         else
           {
               
                if($request->params) {
		        $project_name=$request->params['project_name'];
		        $description=$request->params['description'];
                         $params=json_encode($request->params);
		        
		        $projects = Project::where('id',$request->params['projectid'])->first();


		        $user = JWTAuth::parseToken()->authenticate();
			$userRole = $user->roles()->first()->name;

             
		        $projects->fill([
			      'name' => $project_name,
			      'user_id' => $user->id,
			      'account_id' =>$user->account_id,
			      'description' =>$description,
		              'params' => $params,
		          ]);
	 
			$projects->save();

			return response()->json([
			   'status' => 'success'       
			]);
                }
                else
                {
                        $user = JWTAuth::parseToken()->authenticate();
			$userRole = $user->roles()->first()->name;		
			$projects = new Project();        
			$projects->name = $request->name;
			$projects->user_id = $user->id; 	      
			$projects->account_id = $user->account_id;    
			$projects->description	 = $request->description; 
			$projects->save();
                         
		        $id = $projects->id;
			
			return response()->json([
			   'status' => 'success',
		           'id'=>$id
			]);
		        }
               
           }         
      

    }

	  public function uploadlogo(Request $request) {
                
		   $photo = $request->file('logo');
                   
                   $Y = date('Y');
                   $M = date('M');
                   $p=public_path('img/logos/'.$Y);
                  
                   if(!File::exists($p)) {
			   File::makeDirectory($p);
                           $q=public_path('img/logos/'.$Y.'/'.$M);
                           File::makeDirectory($q);

		           $imagename = time().'.'.$photo->getClientOriginalExtension();
		           $path=$photo->move(public_path('img/logos/'.$Y.'/'.$M), $imagename);
		           return response()->json([
				   'status' => 'success',
				    'url' => url('img/logos/'.$Y.'/'.'/'.$M.'/'.$imagename),
		            ]);
	             }
                    else
                    {
                      
                      $imagename = time().'.'.$photo->getClientOriginalExtension();
                      $path=$photo->move(public_path('img/logos/'.$Y.'/'.$M), $imagename);
                       return response()->json([
			   'status' => 'success',
		            'url' =>url('img/logos/'.$Y.'/'.'/'.$M.'/'.$imagename),
			]);
              
                     }
    
	  }

    public function updateproject(Request $request)
    {
               $projects = Project::findOrFail($request->projectid);             
               $user = JWTAuth::parseToken()->authenticate();
              //print_r($request->all()); die('::project');
                $projects->fill([
              'name' => $request->input('name'),
              'user_id' => $user->id,
              'account_id' =>$user->account_id,
              'description' => $request->input('description'),
             
           ]);
           $projects->save();

           return response()->json([
		   'status' => 'success',                   
		]);
    }

  /* public function getprojectvalue(Request $request)
    {
     print_r($request->all()); die();
     $profielddata=ProjectFieldsValue::find()->get();
 
     return response([
      'status'=>'success',
      'data'=>$profielddata
     ]);
    }*/

 /*public function getprojectvaluebyid(Request $request,$id)
 {
   print_r($id); die('::projectvalueid');
   $projectfield=ProjectFieldsValue::where('id',$id)->first();

   return response([
     'status'=>'success',
      'data'=>$projectfield
   ]);

 }*/

 /* public function createprojectvalue(Request $request)
   {
       print_r($request->all()); die();
       $profieldval=new ProjectFieldsValue();

        $profieldval->fill([
              'value' => $request->input('params')                           
           ]);
        $profieldval->save();
  
        return response()->json([
          'status'=>'success'
        ]);
       echo 'create project value';
   }*/

/* public function updateprojectvalue(Request $request)
 {
    print_r($request->all()); die('update project value');
    
    $projectvalue=ProjectFieldsValue::where('project_id',$request->id)->get();
    $projectvalue->fill([
      'value'=>$request->input('params')
     ]);
    $projectvalue->save();

    return response()->json([
     'status'=>'success'
     ]);

 }*/

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $Category)
    {
                $Category->load('media');
		return new CategoryResource($Category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
              'name' => 'required'
          ]);

        $category = Category::findOrFail($id);
        
        $category->fill([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);
         
        $category->save();
        
        if ($request->hasFile('productimg')) {
            if($lmedia = $category->getMedia('category_image')->first()) {
               $category->deleteMedia($lmedia->id);
            }
            $category->addMediaFromRequest('productimg')->toMediaCollection('category_image');
        }

        return response()->json([
          'status' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //echo "dfs" die;
		Category::find($id)->delete();
		return response()->json([
            'status' => 'success'
        ]);
    }
}
