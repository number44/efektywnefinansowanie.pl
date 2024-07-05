CREATE TABLE IF NOT EXISTS `course_group`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS `academy_admin`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_id` BIGINT NOT NULL,
    `academy_name` BIGINT NOT NULL,
    `city` BIGINT NOT NULL,
    `admin_user_id` BIGINT NOT NULL 
);
CREATE TABLE IF NOT EXISTS `academy_course`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` BIGINT NOT NULL,
    `name` BIGINT NOT NULL,
    `order` INT NOT NULL,
    `course_group_id` INT NOT NULL,
    `speciality` VARCHAR(3000) NOT NULL,
    `type` ENUM('') NOT NULL,
    `mode` ENUM('') NOT NULL,
    `description_html` BLOB NOT NULL,
    `languages` ENUM('') NOT NULL,
    `options` ENUM('') NOT NULL,
    `recrutation_html` BLOB NOT NULL,
    `job_ids` BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS `academy`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `banner` VARCHAR(250) NOT NULL,
    `shortname` VARCHAR(100) NOT NULL,
    `area` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `logo` VARCHAR(100) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `academy_admin_id` BIGINT NOT NULL,
    `academy_search_id` BIGINT NOT NULL,
    `academy_promo` BIGINT NOT NULL,
    `academy_details` BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS `studiowac_academy_job`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `group_id` BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS `academy_promo_active`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_promo_id` BIGINT NOT NULL,
    `academy_name` VARCHAR(255) NOT NULL ,
    `academy_shortname` VARCHAR(255) NOT NULL ,
    `promo_type` ENUM('') NOT NULL DEFAULT 'paid' ,    
    `promo_start` DATE NOT NULL,
    `promo_end` DATE NOT NULL,
    `photo_path` VARCHAR(255) NOT NULL ,
    `target_url` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `sticker_name` VARCHAR(255) NULL,
    `sticker_color` ENUM('') NULL
);
ALTER TABLE
    `academy_promo_active` ADD INDEX `academy_promo_active_promo_type_promo_start_promo_end_index`(
        `promo_type`,
        `promo_start`,
        `promo_end`
    );
CREATE TABLE IF NOT EXISTS `academy_promo`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_id` BIGINT NOT NULL,
    `working_notes` VARCHAR(255) NULL,
    `status` ENUM('') NOT NULL,
    `promo_type` ENUM('') NOT NULL ,
    `promo_start` DATE NOT NULL,
    `promo_end` DATE NOT NULL,
    `photo_path` VARCHAR(250) NOT NULL,
    `target_url` VARCHAR(255) NOT NULL,
    `title` VARCHAR(250) NOT NULL,
    `subtitle` VARCHAR(255) NULL,
    `sticker_name` VARCHAR(20) NULL,
    `sticker_color` ENUM('') NOT NULL,
    `description` VARCHAR(255) NOT NULL 
);
ALTER TABLE
    `academy_promo` ADD INDEX `academy_promo_academy_id_index`(`academy_id`);
CREATE TABLE IF NOT EXISTS `academy_details`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_id` BIGINT NOT NULL,
    `academy_name` VARCHAR(255) NOT NULL,
    `banner_path` VARCHAR(100) NULL,
    `banner_target_url` VARCHAR(255) NULL,
    `type` VARCHAR(45) NOT NULL,
    `logo_path` VARCHAR(100) NULL,
    `address` VARCHAR(100) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `area` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `url` VARCHAR(100) NULL,
    `tab_ids` BIGINT NULL,
    `all_courses_intro_html` BLOB NOT NULL ,
    `all_courses_recrutation_html` BLOB NOT NULL 
);
ALTER TABLE
    `academy_details` ADD INDEX `academy_details_academy_id_index`(`academy_id`);
CREATE TABLE IF NOT EXISTS `academy_search`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_id` BIGINT NOT NULL,
    `academy_shortname` BIGINT NOT NULL,
    `logo_path` BIGINT NOT NULL,
    `city_name` BIGINT NOT NULL,
    `city_url` BIGINT NOT NULL,
    `area_name` BIGINT NOT NULL,
    `area_link` BIGINT NOT NULL,
    `type_name` BIGINT NOT NULL,
    `type_link` BIGINT NOT NULL,
    `count_faculties` INT NOT NULL,
    `count_courses` INT NOT NULL,
    `count_specialities` INT NOT NULL,
    `target_url` BIGINT NOT NULL
);
ALTER TABLE
    `academy_search` ADD INDEX `academy_search_city_name_academy_shortname_area_name_index`(
        `city_name`,
        `academy_shortname`,
        `area_name`
    );
CREATE TABLE IF NOT EXISTS `academy_faculty`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_id` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `order` INT NOT NULL,
    `faculty_intro_html` BLOB NOT NULL,
    `faculty_rectutation_html` BLOB NOT NULL
);
CREATE TABLE IF NOT EXISTS `academy_details_tab`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `academy_details_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `order` INT NOT NULL,
    `html` BLOB NOT NULL
);
ALTER TABLE
    `academy_details_tab` ADD CONSTRAINT `academy_details_tab_academy_details_id_foreign` FOREIGN KEY(`academy_details_id`) REFERENCES `academy_details`(`id`);
ALTER TABLE
    `academy_course` ADD CONSTRAINT `academy_course_course_group_id_foreign` FOREIGN KEY(`course_group_id`) REFERENCES `course_group`(`id`);
ALTER TABLE
    `academy` ADD CONSTRAINT `academy_academy_details_foreign` FOREIGN KEY(`academy_details`) REFERENCES `academy_details`(`id`);
ALTER TABLE
    `academy_details` ADD CONSTRAINT `academy_details_academy_id_foreign` FOREIGN KEY(`academy_id`) REFERENCES `academy`(`id`);
ALTER TABLE
    `academy_faculty` ADD CONSTRAINT `academy_faculty_academy_id_foreign` FOREIGN KEY(`academy_id`) REFERENCES `academy`(`id`);
ALTER TABLE
    `academy_search` ADD CONSTRAINT `academy_search_academy_id_foreign` FOREIGN KEY(`academy_id`) REFERENCES `academy`(`id`);
ALTER TABLE
    `academy_promo` ADD CONSTRAINT `academy_promo_academy_id_foreign` FOREIGN KEY(`academy_id`) REFERENCES `academy`(`id`);
ALTER TABLE
    `academy_course` ADD CONSTRAINT `academy_course_job_ids_foreign` FOREIGN KEY(`job_ids`) REFERENCES `studiowac_academy_job`(`id`);
ALTER TABLE
    `academy` ADD CONSTRAINT `academy_academy_admin_id_foreign` FOREIGN KEY(`academy_admin_id`) REFERENCES `academy_admin`(`id`);
ALTER TABLE
    `studiowac_academy_job` ADD CONSTRAINT `studiowac_academy_job_group_id_foreign` FOREIGN KEY(`group_id`) REFERENCES `course_group`(`id`);
ALTER TABLE
    `academy_promo_active` ADD CONSTRAINT `academy_promo_active_academy_promo_id_foreign` FOREIGN KEY(`academy_promo_id`) REFERENCES `academy_promo`(`id`);
ALTER TABLE
    `academy_admin` ADD CONSTRAINT `academy_admin_academy_id_foreign` FOREIGN KEY(`academy_id`) REFERENCES `academy`(`id`);
ALTER TABLE
    `academy_details` ADD CONSTRAINT `academy_details_tab_ids_foreign` FOREIGN KEY(`tab_ids`) REFERENCES `academy_details_tab`(`id`);
ALTER TABLE
    `academy` ADD CONSTRAINT `academy_academy_promo_foreign` FOREIGN KEY(`academy_promo`) REFERENCES `academy_promo`(`id`);
ALTER TABLE
    `academy_course` ADD CONSTRAINT `academy_course_faculty_id_foreign` FOREIGN KEY(`faculty_id`) REFERENCES `academy_faculty`(`id`);
ALTER TABLE
    `academy` ADD CONSTRAINT `academy_academy_search_id_foreign` FOREIGN KEY(`academy_search_id`) REFERENCES `academy_search`(`id`);