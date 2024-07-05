<?php

namespace App\Api\Model;

class Promo
{

    static function create()
    {
        global $wpdb;
        $table_name = $wpdb->prefix . 'academy';
        $sql = $wpdb->prepare(
            "
            CREATE TABLE IF NOT EXISTS $table_name(
                id INT AUTO_INCREMENT PRIMARY KEY,
                academy_id BIGINT NOT NULL,
                status VARCHAR(20) NOT NULL,
                promo_type VARCHAR(20),
                promo_start DATE,
                promo_end DATE,
                photo_path VARCHAR(250) NOT NULL,
                target_url VARCHAR(255) NOT NULL,
                title VARCHAR(250) NOT NULL,
                subtitle VARCHAR(255) NULL,
                sticker_name VARCHAR(20) NULL,
                description VARCHAR(255) NOT NULL 
            )
            "
        );
        $wpdb->query($sql);
    }
}