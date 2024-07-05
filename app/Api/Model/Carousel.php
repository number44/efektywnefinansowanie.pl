<?php
namespace App\Api\Model;

class Carousel
{
    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'carousel';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "
            CREATE TABLE IF NOT EXISTS $table_name (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                subtitle VARCHAR(100) NOT NULL,
                tag VARCHAR(45),
                color VARCHAR(7),
                url VARCHAR(100),
                newTab BOOLEAN,
                imgUrl VARCHAR(100),
                imgSmUrl VARCHAR(100)
            ) $charset_collate;
        ";
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}
