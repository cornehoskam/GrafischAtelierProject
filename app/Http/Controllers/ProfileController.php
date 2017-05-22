<?php

namespace App\Http\Controllers;

use App\Course;
use App\IndividualReservation;
use Illuminate\Http\Request;
use Auth;
use Redirect;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getProfile()
    {
        if (!Auth::check())
        {
            return Redirect::to('login');
        }
        else
        {
            switch (Auth::user()->role)
            {
                case "admin":
                    $role = "Administrator";
                    break;
                default:
                    $role = "Gebruiker";
                    break;
            }
            //Get reserved tables
            $date = date('Y-m-d H:i:s');
            $reservedTables = DB::table('individual_reservations')->where('user_id', Auth::user()->id)->where('end_date', '>', $date)->get();
            //get signed up courses
            $courses = DB::table('courses_has_users')->where('user_id', Auth::user()->id)->get();
            $signedupCourses = array();
            foreach($courses as $course)
            {
                $matchingCourse = Course::find($course->course_id);
                if($matchingCourse->end_date > $date)
                {
                    array_push($signedupCourses, $matchingCourse->name);
                }
            }

            $userinfo = array(
                'username' => Auth::user()->username,
                'role' => $role,
                'mail' => Auth::user()->email,
                'address' => Auth::user()->address,
            );
            return view('profile', compact('userinfo', "reservedTables", "signedupCourses"));
        }
    }
    
    public function getChangePassword()
    {
    	if (!Auth::check())
    	{
    		return Redirect::to('login');
    	}
    	else
    	{
    		return view('change_password');
    	}
    }
    
    public function changePassword()
    {
    	if(!Auth::check())
    	{
    		return Redirect::to('login');
    	}
    	else
    	{
    		$currentPassword = Auth::User()->passwordp;
    		if(Hash::check($_POST['current_password'], $currentPassword))
    		{
    			
    			if($_POST['new_password'] == $_POST['confirmation_password'])
    			{
    				$userId = Auth::User()->id;
    				$userObj = User::find($userId);
    				$userObj->password = Hash::make($_POST['new_password']);
    				$userObj->save();
    				
    				return Redirect::to('profiel');
    			}
    			else 
    			{
    				
    				return Redirect::to('wachtwoord_wijzigen'); 
    			}
    			
    		}
    		else 
    		{
    			
    			return Redirect::to('wachtwoord_wijzigen'); 
    		}
    		
    	}
    }
    
}
