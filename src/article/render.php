<?php

$unique_id = wp_unique_id( 'p-' );
$post_id  =get_the_ID();
$post = get_post( $post_id );
$post_title = get_the_title( $post_id );
$placeholder = get_template_directory_uri() . ('/assets/images/placeholder.png');
$thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small') ?: $placeholder;
$thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large') ?: $placeholder;
$post_categories = get_the_category($post->ID);
$modified_date = get_the_modified_date('Y-m-d', $post->ID);
$sidebar = $attributes["sidebar"] ?? null;
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="studiowac-article"
	<?php echo wp_interactivity_data_wp_context( array( 'isOpen' => false ) ); ?>
	data-wp-watch="callbacks.logIsOpen"
	>
<?php 
?>
	<div class="article-grid">
		<div>
			<div class="breadcrumb">
  				<a href="<?php  echo esc_url( home_url( '/' ) ); ?>" title="Strona główna" class="breadcrumb__link">
  				  Strona główna
  				</a>
  				<img src="<?php  echo get_stylesheet_directory_uri() . '/assets/images/right-arrow-blue.svg'; ?>" alt="arrow right" />
				<p>
					<?php echo $post_title; ?>
				</p>
			</div>
			<div class="post-content">
			<div class="article-header">
        <picture class="lightbox" data-wp-on--click="actions.openDialog">
         
          <img class="placeholder" data-src-small="<?php echo $thumbnail_url_small; ?>" data-src-large="<?php echo $thumbnail_url_large; ?>" alt="<?php echo $post_title; ?>" title="<?php echo $post_title;  ?>">
        </picture>
        <div class="article-header__chips hide-on-small">
          <?php 
		 if ( ! empty( $post_categories ) ) {
			foreach ( $post_categories as $category ) {
				?>
				<a href="<?php echo esc_url( get_category_link( $category->term_id ) ); ?>" title="<?php echo esc_html( $category->name ); ?>">
					<?php echo esc_html( $category->name ); ?>
				</a>
				<?php
			}
		} 
		  ?>
        </div>
      </div>
	  <h2 class="article-title">
        <?=  $post_title; ?>
      </h2>
	  <div class="article-date mt-1">Aktualizacja: <?= $modified_date; ?></div>
	  <div class="article-content">
		  <?php echo $content; ?>
	  </div>
			</div>
		</div>
		
		<?php   
			if($sidebar) {
				echo do_blocks($sidebar); 
			}
		?>

	</div>
	<dialog class="dialog-article" data-wp-on--click="actions.closeDialog">
      <div class="close-dialog border-box" data-wp-on--click="actions.closeDialog">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <div class="dialog-context">
        <picture class="dialog-article__image">
          <img data-src-small="<?php echo $thumbnail_url_small; ?>" data-src-large="<?php echo $thumbnail_url_large; ?>" alt="<?php echo $post_title; ?>"  class="placeholder ">
        </picture>
      </div>
    </dialog>
</div>