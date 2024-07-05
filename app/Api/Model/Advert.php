<?php
namespace App\Api\Model;
class Advert
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'advert';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                `title` VARCHAR(255) NOT NULL,
                `subtitle` VARCHAR(255) NOT NULL,
                `content` TEXT NOT NULL,
                `url` VARCHAR(100) NOT NULL,
                `type` INT NOT NULL
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
