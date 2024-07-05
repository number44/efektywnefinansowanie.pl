<?php 

// Zmienić na Icon . 
function add_category_image_field() {
    ?>
    <div class="form-field term-group">
        <label for="icon"><?php _e('Category Image', 'studiowac.pl'); ?></label>
        <input type="hidden" id="icon" name="icon" value="">
        <div id="category-image-wrapper"></div>
        <p>
            <input type="button" class="button button-secondary" id="category-image-button" value="<?php _e('Add Image', 'studiowac.pl'); ?>">
            <input type="button" class="button button-secondary" id="category-image-remove" value="<?php _e('Remove Image', 'studiowac.pl'); ?>">
        </p>
    </div>
    <?php
}
add_action('category_add_form_fields', 'add_category_image_field', 10, 2);

// Edit category image field
function edit_category_image_field($term) {
    $image_id = get_term_meta($term->term_id, 'icon', true);
    ?>
    <tr class="form-field term-group-wrap">
        <th scope="row"><label for="icon"><?php _e('Category Image', 'studiowac.pl'); ?></label></th>
        <td>
            <input type="hidden" id="icon" name="icon" value="<?php echo esc_attr($image_id); ?>">
            <div id="category-image-wrapper">
                <?php if ($image_id) { echo wp_get_attachment_image($image_id, 'thumbnail'); } ?>
            </div>
            <p>
                <input type="button" class="button button-secondary" id="category-image-button" value="<?php _e('Add Image', 'studiowac.pl'); ?>">
                <input type="button" class="button button-secondary" id="category-image-remove" value="<?php _e('Remove Image', 'studiowac.pl'); ?>">
            </p>
        </td>
    </tr>
    <?php
}
add_action('category_edit_form_fields', 'edit_category_image_field', 10, 2);

// Save category image
function save_category_image($term_id) {
    if (isset($_POST['icon']) && '' !== $_POST['icon']) {
        $image = $_POST['icon'];
        update_term_meta($term_id, 'icon', $image);
    } else {
        update_term_meta($term_id, 'icon', '');
    }
}
add_action('created_category', 'save_category_image', 10, 2);
add_action('edited_category', 'save_category_image', 10, 2);

// Enqueue media uploader script
function load_wp_media_files() {
    wp_enqueue_media();
    wp_enqueue_script('category-image-upload', get_template_directory_uri() . '/inc/category-image.js', array('jquery'), null, true);
}
add_action('admin_enqueue_scripts', 'load_wp_media_files');
