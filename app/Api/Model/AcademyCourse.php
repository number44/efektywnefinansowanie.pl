<?php
namespace App\Api\Model;

class AcademyCourse
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy_course';
        $charset_collate = $wpdb->get_charset_collate();
        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_course_id INT NOT NULL,
                academy_id INT NOT NULL,
                admin_id INT NOT NULL,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(45) NOT NULL,
                `order` INT NOT NULL,
                `group` VARCHAR(45) NOT NULL,
                speciality VARCHAR(255) NOT NULL,
                mode VARCHAR(45) NOT NULL,
                sort VARCHAR(45) NOT NULL,
                INDEX (`order`)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}