<?php
namespace App\Helpers;


class Carousel
{
    public static function getCarousel()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'carousel';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }
}