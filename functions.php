<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
	require_once __DIR__ . '/vendor/autoload.php';
	require_once __DIR__ . '/app/boot.php';
	 require_once __DIR__ . '/inc/getters.php';
	// require_once __DIR__ . '/inc/AdvertFoo.php';


if( ! function_exists( 'create_block_new_interactive_block_init' ) ) {

function create_block_new_interactive_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build/bottom' );
	register_block_type_from_metadata( __DIR__ . '/build/catalog' );
	register_block_type_from_metadata( __DIR__ . '/build/carousel' );
	register_block_type_from_metadata( __DIR__ . '/build/ds-footer' );
	register_block_type_from_metadata( __DIR__ . '/build/ds-header' );
	register_block_type_from_metadata( __DIR__ . '/build/section' );
	register_block_type_from_metadata( __DIR__ . '/build/section-black' );
	register_block_type_from_metadata( __DIR__ . '/build/article' );
	register_block_type_from_metadata( __DIR__ . '/build/accordion' );
	register_block_type_from_metadata( __DIR__ . '/build/sidebar' );
}
}
add_action( 'init', 'create_block_new_interactive_block_init' );

add_action('wp_enqueue_scripts', function () {
	wp_enqueue_style( 'main-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style('academyapp', get_template_directory_uri() . '/dist/main.css', array (), '1.0.0');
	wp_enqueue_script('lazyloadjs', get_template_directory_uri() . '/dist/lazyload.js', array(), '1.0.0', true);
	wp_enqueue_script('sliderjs', get_template_directory_uri() . '/dist/slider.js', array(), '1.0.0', true);
	wp_enqueue_script('accordionjs', get_template_directory_uri() . '/dist/accordion.js', array(), '1.0.0', true);
	wp_enqueue_style('lazyloadcss', get_template_directory_uri() . '/dist/lazyload.css', array (), '1.0.0');
});
// add_action( 'widgets_init', 'themename_widgets_init' );
function themename_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Primary Sidebar', 'theme_name' ),
		'id'            => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}

function be_reusable_blocks_admin_menu() {
    add_menu_page( 'Reusable Blocks', 'Reusable Blocks', 'edit_posts', 'edit.php?post_type=wp_block', '', 'dashicons-editor-table', 22 );
}
add_action( 'admin_menu', 'be_reusable_blocks_admin_menu' );


require_once __DIR__ . '/inc/block-list.php';
	// // functions.php
	// function load_wp_media_files() {
	//     wp_enqueue_media();
	// }
	// add_action('admin_enqueue_scripts', 'load_wp_media_files');
require get_template_directory() . '/inc/category-image.php';


function register_category_image_field() {
    register_rest_field('category', 'category_image', array(
        'get_callback' => 'get_category_image',
        'update_callback' => null,
        'schema' => null,
    ));
}

function get_category_image($object, $field_name, $request) {
    $category_id = $object['id'];
    $image_url = get_term_meta($category_id, 'category_image', true);
    return $image_url ? esc_url($image_url) : '';
}

add_action('rest_api_init', 'register_category_image_field');
add_image_size( 'custom-size', 1920, 100); 	


function enqueue_editor_styles() {
    add_editor_style('editor.css');
}
add_action('admin_init', 'enqueue_editor_styles');