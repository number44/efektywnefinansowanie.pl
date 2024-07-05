<?php

namespace App\Api\Controllers;

use App\Api\Controllers\Controller;
use WP_Application_Passwords;

class AuthController extends Controller
{
    public function __construct()
    {
    }
    public static function login($request)
    {
        
        $parameters = $request->get_json_params();
        $user = authenticate_user($parameters);
        // $token = wp_generate_auth_token( $user->ID );

        

        if (is_wp_error($user)) {
            return rest_ensure_response([
                'status' => 'error',
            ]);
        }
        // generate token 

        return rest_ensure_response([
            'status' => 'success',
            "user" => $user,
            "token" => $user->user_pass,
        ]);        
    }
}

function authenticate_user( $data ) {
    $username = $data['username'];
    $password = $data['password'];
    $user = wp_authenticate( $username, $password );
    return $user;
}

