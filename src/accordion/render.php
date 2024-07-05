<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Generate unique id for aria-controls.
$unique_id = wp_unique_id( 'p-' );
$accordions = $attributes["accordions"] ?? [];
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="accordion"
	<?php echo wp_interactivity_data_wp_context( array( 'isOpen' => false , "accordions" => $accordions  ) ); ?>
	data-wp-watch="callbacks.logIsOpen"
>

	<div class="accordion-box accordion-blue">
  <template data-wp-each="context.accordions">
           <div class="accordion">
            <div class="accordion__panel" data-wp-on--click="actions.toggle" data-wp-class--accordion__panel-open="context.isOpen">
              <h2 data-wp-text="context.item.title" ></h2>
              <img class="accordion__panel-icon" src="<?php echo get_stylesheet_directory_uri() . '/assets/accordion/arrow.svg';  ?>" alt="accordion icon">
            </div>
            <div class="accordion__content" data-wp-class--accordion__content-open="context.isOpen">
              <p data-wp-text="context.item.content"
              data-wp-init="callbacks.item"
              >
              
              </p>
            </div>
          </div>
          

  </template>

        </div>
</div>
