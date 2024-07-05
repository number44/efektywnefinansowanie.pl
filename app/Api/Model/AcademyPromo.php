<?php
namespace App\Api\Model;
class AcademyPromo
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_promo';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                `title` VARCHAR(255) NOT NULL,
                `subtitle` VARCHAR(255) NOT NULL,
                `sticker` VARCHAR(45) NOT NULL,
                `banner` VARCHAR(255) NOT NULL,
                `url` VARCHAR(255) NOT NULL,
                `status` VARCHAR(45) NOT NULL,
                `start` VARCHAR(45) NOT NULL,
                `end` VARCHAR(45) NOT NULL
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}