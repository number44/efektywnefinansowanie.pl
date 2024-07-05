<?php
namespace App\Api\Model;
class AcademyTab
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_tab';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                `name` VARCHAR(255) NOT NULL,
                `content` TEXT NOT NULL
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}