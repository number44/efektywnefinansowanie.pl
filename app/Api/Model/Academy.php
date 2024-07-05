<?php
namespace App\Api\Model;

class Academy
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                admin_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                shortname VARCHAR(100) NOT NULL,
                type VARCHAR(45) NOT NULL,
                logo VARCHAR(100),
                logo_path VARCHAR(100),
                banner VARCHAR(250)
            ) $charset_collate;
        ";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
