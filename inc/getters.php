<?php
if(!function_exists('getCarousel')){
    function getCarousel() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'carousel';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }
}

