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
$unique_id = wp_unique_id('p-');
$title = $attributes['heading']['text'] ?? "Katalog uczelni wyższych";
$titleUrl = $attributes['heading']['url'] ?? "#";
$links = $attributes['links'] ?? [];
$logos = getLogoPlatinum() ?? [];
shuffle($logos);
$logos_sliced = array_slice($logos, 0, 6);
// cut logos_sliced to 3 elements
$slide_size = ceil(count($logos_sliced) / 3);
$slides = array_chunk($logos_sliced, $slide_size) ?? [];
// Output the result to check
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'section-one']); ?>
     data-wp-interactive="ds-catalog"
     data-wp-init="actions.init"
     data-wp-watch="callbacks.watchIndex"
     <?php echo wp_interactivity_data_wp_context([
         'isOpen' => false,
         'autoplay' => $autoplay ?? false,
         'delay' => $delay ?? 0,
         'slides' => $slides,
         'index' => 0,
         'slideCount' => count($slides),
         'isButtonContolToLast' => false,
         'isButtonContolToFirst' => false
     ]); ?>>
  <div class="section-title-box">
    <a href="<?php echo esc_url($titleUrl); ?>" title="<?php echo $title; ?>" class="section-title">
      <h1 class="section-title__text"><?php echo $title; ?></h1>
    </a>
  </div>
  <div class="container search-links">
    <?php foreach ($links as $link) { ?>
      <a title="<?php echo $link['title']; ?>" href="<?php echo esc_url($link['url']); ?>" class="search-link box">
        <picture>
          <img data-src-small="<?php echo $link['imgSmUrl']; ?>"
               data-src-large="<?php echo $link['imgUrl']; ?>"
               alt="<?php echo $link['alt']; ?>"
               class="placeholder placeholder-tag"
          />
        </picture>
        <div class="content">
          <h3 class="hide-on-medium"><?php echo $link['text']; ?></h3>
          <h3 class="hide-on-xlarge"><?php echo $link['textSm']; ?></h3>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0001 18.9999C9.7664 19.0004 9.53996 18.919 9.36005 18.7699C9.25879 18.686 9.17509 18.5829 9.11374 18.4665C9.05239 18.3502 9.01459 18.2229 9.00251 18.0919C8.99044 17.9609 9.00432 17.8289 9.04337 17.7033C9.08241 17.5777 9.14585 17.461 9.23005 17.3599L13.7101 11.9999L9.39005 6.62994C9.30699 6.52765 9.24495 6.40996 9.20752 6.28362C9.17009 6.15728 9.158 6.02479 9.17194 5.89376C9.18587 5.76273 9.22557 5.63575 9.28875 5.52011C9.35192 5.40447 9.43732 5.30246 9.54005 5.21994C9.64352 5.1289 9.76468 5.06024 9.89595 5.01825C10.0272 4.97626 10.1657 4.96185 10.3028 4.97594C10.4399 4.99002 10.5726 5.03229 10.6926 5.1001C10.8126 5.1679 10.9173 5.25977 11.0001 5.36994L15.8301 11.3699C15.9771 11.5489 16.0575 11.7733 16.0575 12.0049C16.0575 12.2366 15.9771 12.461 15.8301 12.6399L10.8301 18.6399C10.7297 18.761 10.6023 18.8566 10.4581 18.9192C10.3139 18.9817 10.157 19.0094 10.0001 18.9999Z" fill="white"/>
          </svg>
        </div>
      </a>
    <?php } ?>
  </div>
  <section class="container hide-on-medium">
    <div class="catalog-logos container">
      <?php foreach ($logos_sliced as $logo) { ?>
        <a title="<?php echo $logo->title; ?>" href="<?php echo esc_url($logo->url); ?>" class="catalog-logo shadow flex-center">
          <picture>
            <img class="placeholder" data-src-small="<?php echo $logo->imgSmUrl; ?>" data-src-large="<?php echo $logo->imgUrl; ?>" alt="<?php echo $logo->alt; ?>" />
          </picture>
        </a>
      <?php } ?>
    </div>
  </section>
  <div class="slider-section hide-on-xlarge">
    <div class="slider">
      <?php 
      $index = 0;
      foreach ($slides as $slide) { ?>
        <div class="slide" data-slide-index="<?php echo $index; ?>">
          <a href="<?php echo $slide[0]->url; ?>" title="<?php echo $slide[0]->title; ?>" class="slide-logo">
            <img class="placeholder" data-src-small="<?php echo $slide[0]->imgSmUrl; ?>" data-src-large="<?php echo $slide[0]->imgUrl; ?>" alt="<?php echo $slide[0]->alt; ?>" />
          </a>
          <div class="slide-logo">
            <img class="placeholder" data-src-small="<?php echo $slide[1]->imgSmUrl; ?>" data-src-large="<?php echo $slide[1]->imgUrl; ?>" alt="<?php echo $slide[1]->alt; ?>" />
          </div>
        </div>
      <?php 
      $index++;
      } ?>
    </div>
    <div class="slider-control">
      <span class="left" data-wp-on--click="actions.prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" transform="matrix(-1 0 0 1 24 0)" fill="#A80000"></circle>
          <path d="M13.5 17.25C13.6753 17.2503 13.8451 17.1893 13.98 17.0775C14.056 17.0145 14.1187 16.9372 14.1648 16.8499C14.2108 16.7626 14.2391 16.6672 14.2482 16.5689C14.2572 16.4707 14.2468 16.3716 14.2175 16.2774C14.1883 16.1832 14.1407 16.0957 14.0775 16.02L10.7175 12L13.9575 7.97246C14.0198 7.89574 14.0663 7.80747 14.0944 7.71271C14.1225 7.61796 14.1316 7.51859 14.1211 7.42032C14.1107 7.32205 14.0809 7.22681 14.0335 7.14008C13.9861 7.05336 13.9221 6.97685 13.845 6.91496C13.7674 6.84668 13.6765 6.79518 13.5781 6.76369C13.4797 6.73219 13.3758 6.72139 13.2729 6.73195C13.1701 6.74252 13.0706 6.77422 12.9806 6.82507C12.8906 6.87592 12.8121 6.94483 12.75 7.02746L9.12752 11.5275C9.01721 11.6617 8.95691 11.83 8.95691 12.0037C8.95691 12.1774 9.01721 12.3458 9.12752 12.48L12.8775 16.98C12.9528 17.0707 13.0483 17.1425 13.1565 17.1894C13.2647 17.2363 13.3823 17.257 13.5 17.25Z" fill="white"/>
        </svg>
      </span>
      <div class="bullets">
        <?php foreach($slides as $slide): ?>
          <span class="bullet"></span>
        <?php endforeach; ?>
      </div>
      <span class="right" data-wp-on--click="actions.next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#A80000"></circle>
          <path d="M10.5 17.25C10.3247 17.2503 10.1549 17.1893 10.02 17.0775C9.94403 17.0145 9.88126 16.9372 9.83524 16.8499C9.78923 16.7626 9.76088 16.6672 9.75182 16.5689C9.74277 16.4707 9.75318 16.3716 9.78246 16.2774C9.81175 16.1832 9.85933 16.0957 9.92248 16.02L13.2825 12L10.0425 7.97246C9.98018 7.89574 9.93365 7.80747 9.90558 7.71271C9.87751 7.61796 9.86844 7.51859 9.87889 7.42032C9.88935 7.32205 9.91912 7.22681 9.9665 7.14008C10.0139 7.05336 10.0779 6.97685 10.155 6.91496C10.2326 6.84668 10.3235 6.79518 10.4219 6.76369C10.5203 6.73219 10.6242 6.72139 10.7271 6.73195C10.8299 6.74252 10.9294 6.77422 11.0194 6.82507C11.1094 6.87592 11.1879 6.94483 11.25 7.02746L14.8725 11.5275C14.9828 11.6617 15.0431 11.83 15.0431 12.0037C15.0431 12.1774 14.9828 12.3458 14.8725 12.48L11.1225 16.98C11.0472 17.0707 10.9517 17.1425 10.8435 17.1894C10.7353 17.2363 10.6177 17.257 10.5 17.25Z" fill="white"/>
        </svg>
      </span>
    </div>
  </div>
</div>
