<?php
namespace App\Api\Model;
class AcademyContact
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_contact';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                `area` VARCHAR(45) NOT NULL,
                `city` VARCHAR(45) NOT NULL,
                `zip` VARCHAR(10) NOT NULL,
                `address` VARCHAR(100) NOT NULL,
                `phone` VARCHAR(20) NOT NULL,
                `email` VARCHAR(100) NOT NULL,
                `url` VARCHAR(100) NOT NULL
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
