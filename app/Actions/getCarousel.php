<?php

namespace App\Actions;


class Actions {
    public static function getCarousel() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
        
    }
}