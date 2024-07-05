<?php
namespace App\Api\Model;
class AcademyFaculty
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_faculty';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                `order` INT NOT NULL,
                recruitment TEXT,
                course TEXT,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                user_id INT NOT NULL,
                INDEX (`order`)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}