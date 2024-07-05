<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function my_theme_enqueue_scripts() {
    $asset_file = get_template_directory() . '/build/index.asset.php';
    if (file_exists($asset_file)) {
        $asset = include $asset_file;
        $dependencies = isset($asset['dependencies']) ? $asset['dependencies'] : array();
        $version = isset($asset['version']) ? $asset['version'] : false;
        wp_enqueue_script(
            'my-theme-main-script', 
            get_template_directory_uri() . '/build/index.js',
            $dependencies, 
            $version, 
            true  
        );
    } else {
        wp_enqueue_script(
            'my-theme-main-script',
            get_template_directory_uri() . '/build/index.js',
            array(), 
            null, 
            true  
        );
    }
}
// Hook into wp_enqueue_scripts
add_action('enqueue_block_editor_assets', 'my_theme_enqueue_scripts');



