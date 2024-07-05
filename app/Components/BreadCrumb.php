<?php
namespace App\Components;


class BreadCrumb
{
    public static function getBreadCrumb() : string {
        $output = '<ul class="breadcrumb">';
        $output .= '<li><a href="' . get_home_url() . '">Strona główna</a></li>';
        $output .= '</ul>';
        return $output;
    }
}