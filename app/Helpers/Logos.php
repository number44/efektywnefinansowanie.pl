<?php
namespace App\Helpers;


class Logos{

    public static function getLogoGold(){
        global $wpdb;
        $table_name = $wpdb->prefix . 'logo_gold';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }

    public static function getLogoPlatinum(){
        global $wpdb;
        $table_name = $wpdb->prefix . 'logo_platinum';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }

    public static function getLogoSilver(){
        global $wpdb;
        $table_name = $wpdb->prefix . 'logo_silver';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }

    public static function getLogoBronze(){
        global $wpdb;
        $table_name = $wpdb->prefix . 'logo_bronze';
        $r = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");
        return $r;
    }
}