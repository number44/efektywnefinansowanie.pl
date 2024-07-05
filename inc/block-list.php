<?php
// Function to add a custom admin menu item
function custom_blocks_admin_menu() {
    add_menu_page(
        'Custom Blocks', // Page title
        'Custom Blocks', // Menu title
        'manage_options', // Capability
        'custom-blocks', // Menu slug
        'custom_blocks_admin_page', // Callback function
        'dashicons-screenoptions', // Icon
        20 // Position
    );
}
add_action('admin_menu', 'custom_blocks_admin_menu');

// Callback function to display the custom blocks
function custom_blocks_admin_page() {
    // Get all registered blocks
    $blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

    echo '<div class="wrap">';
    echo '<h1>Installed Custom Blocks</h1>';
    echo '<ul>';
    
    // Loop through the blocks and display their names
    foreach ($blocks as $block_name => $block) {
        echo '<li>' . esc_html($block_name) . '</li>';
    }
    
    echo '</ul>';
    echo '</div>';
}

// Shortcode to display the custom blocks on a page or post
function custom_blocks_shortcode() {
    $blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
    $output = '<ul>';
    
    foreach ($blocks as $block_name => $block) {
        $output .= '<li>' . esc_html($block_name) . '</li>';
    }
    
    $output .= '</ul>';
    return $output;
}
add_shortcode('custom_blocks_list', 'custom_blocks_shortcode');
