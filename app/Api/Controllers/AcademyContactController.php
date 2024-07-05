<?php

namespace App\Api\Controllers;

use App\Api\Controllers\Controller;

class AcademyContactController extends Controller
{
    public function __construct()
    {

    }
    public static function index()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return rest_ensure_response($r);
    }
    public static function show($request)
    {
        $id = $request->get_param('id');
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $response = $wpdb->get_results("SELECT * FROM $table_name WHERE id = $id");
        return rest_ensure_response($response);
    }
    public static function store($request)
    {
        global $wpdb;
        $parameters = $request->get_json_params();

        $table_name = $wpdb->prefix . 'academy_contact';
        $r = $wpdb->insert($table_name, $parameters);
        if ($r) {
            $id = $wpdb->insert_id;
            return rest_ensure_response(["id" => $id]);
        } else {
            return rest_ensure_response(["Error" => $wpdb->last_error]);
        }
    }
    public static function update($request)
    {
        global $wpdb;
        $id = $request->get_param('id');
        $table_name = $wpdb->prefix . 'academy_contact';
        $modifiedRes = $wpdb->update($table_name, $request->get_json_params(), array('id' => $id));
        if ($modifiedRes) {
            return rest_ensure_response($request->get_json_params());
        } else {
            return rest_ensure_response(["Error" => "Can not update"]);
        }
    }
    public static function destroy($request)
    {
        $id = $request->get_param('id');
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $r = $wpdb->delete($table_name, array('id' => $id));
        return rest_ensure_response($r);
    }
    public static function search($search)
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $r = $wpdb->get_results("SELECT * FROM $table_name WHERE name LIKE '%$search%'");
        return rest_ensure_response($r);
    }
}