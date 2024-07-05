<?php
// wp-content/themes/your-theme/custom-blocks/hello-world/register-block.php
function custom_register_hello_world_block() {
    // Register the block script
    wp_register_script(
        'custom-hello-world-block',
        get_template_directory_uri() . '/inc/block.js',
        array('wp-blocks', 'wp-element'),
        filemtime(get_template_directory() . '/inc/block.js')
    );

    // Register the block
    register_block_type('custom/hello-world', array(
        'editor_script' => 'custom-hello-world-block',
    ));
}
add_action('init', 'custom_register_hello_world_block');
