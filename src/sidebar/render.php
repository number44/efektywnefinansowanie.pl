<?php
$unique_id = wp_unique_id( 'p-' );
$link = $attributes["toplink"] ?? [];
$slides = getCarousel() ?: [];
$autoplay = $attributes["autoplay"]["auto"] ?: true;
$delay = $attributes["autoplay"]["delay"] ?: 5000;


?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="sidebar"
  data-wp-init="actions.init" 
	<?php echo wp_interactivity_data_wp_context( array( 'isOpen' => false, "autoplay" => $autoplay, "delay" => $delay   ) ); ?>
>
<p class="aside-link">
    <span>Polecamy :</span>
    <a href="<?php  echo esc_url( home_url( '/' ) ); ?>" title="Ranking aplikacji do nauki j. angielskiego">Ranking aplikacji do nauki j. angielskiego</a>
</p>
<div class="carousel-box hide-on-small hide-on-large">

<div class="carousel">
    <?php foreach($slides as $slide): ?>
    <div  class="carousel-item">
      <a title="asdasd" href="#" class="carousel-image">
        <div class="content container">
          <h2 title="<?php  echo $slide->title; ?>" class="title"><?php  echo $slide->title; ?></h2>
          <p title="<?php  echo $slide->subtitle; ?>" class="subtitle hide-on-small"><?php  echo $slide->subtitle; ?></p>
          <button class="button button--blue">Sprawdź</button>
        </div>
        <img  draggable="false" data-src-large="<?php  echo $slide->imgUrl; ?>" data-src-small="<?php  echo $slide->imgSmUrl; ?>" alt="Image 1" class="preloader">
      </a>
    </div>
    <?php endforeach; ?>
    <div class="arrows">
      <div class="arrow arrow-left" data-wp-on--click="actions.next">
        <svg  width="24" height="24" class="swiper-element-arrow-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 17.25C13.6753 17.2503 13.8451 17.1893 13.98 17.0775C14.056 17.0145 14.1187 16.9372 14.1648 16.8499C14.2108 16.7626 14.2391 16.6672 14.2482 16.5689C14.2572 16.4707 14.2468 16.3716 14.2175 16.2774C14.1883 16.1832 14.1407 16.0957 14.0775 16.02L10.7175 12L13.9575 7.97246C14.0198 7.89574 14.0663 7.80747 14.0944 7.71271C14.1225 7.61796 14.1316 7.51859 14.1211 7.42032C14.1107 7.32205 14.0809 7.22681 14.0335 7.14008C13.9861 7.05336 13.9221 6.97685 13.845 6.91496C13.7674 6.84668 13.6765 6.79518 13.5781 6.76369C13.4797 6.73219 13.3758 6.72139 13.2729 6.73195C13.1701 6.74252 13.0706 6.77422 12.9806 6.82507C12.8906 6.87592 12.8121 6.94483 12.75 7.02746L9.12752 11.5275C9.01721 11.6617 8.95691 11.83 8.95691 12.0037C8.95691 12.1774 9.01721 12.3458 9.12752 12.48L12.8775 16.98C12.9528 17.0707 13.0483 17.1425 13.1565 17.1894C13.2647 17.2363 13.3823 17.257 13.5 17.25Z" fill="white"></path>
        </svg>
      </div>
      <?php foreach($slides as $slide): ?>
        <span class="bullet "></span>
      <?php endforeach; ?>
        <div class="arrow arrow-right">
          <svg width="24" height="24" viewBox="0 0 24 24" class="swiper-element-arrow-right" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 17.25C10.3247 17.2503 10.1549 17.1893 10.02 17.0775C9.94403 17.0145 9.88126 16.9372 9.83524 16.8499C9.78923 16.7626 9.76088 16.6672 9.75182 16.5689C9.74277 16.4707 9.75318 16.3716 9.78246 16.2774C9.81175 16.1832 9.85933 16.0957 9.92248 16.02L13.2825 12L10.0425 7.97246C9.98018 7.89574 9.93365 7.80747 9.90558 7.71271C9.87751 7.61796 9.86844 7.51859 9.87889 7.42032C9.88935 7.32205 9.91912 7.22681 9.9665 7.14008C10.0139 7.05336 10.0779 6.97685 10.155 6.91496C10.2326 6.84668 10.3235 6.79518 10.4219 6.76369C10.5203 6.73219 10.6242 6.72139 10.7271 6.73195C10.8299 6.74252 10.9294 6.77422 11.0194 6.82507C11.1094 6.87592 11.1879 6.94483 11.25 7.02746L14.8725 11.5275C14.9828 11.6617 15.0431 11.83 15.0431 12.0037C15.0431 12.1774 14.9828 12.3458 14.8725 12.48L11.1225 16.98C11.0472 17.0707 10.9517 17.1425 10.8435 17.1894C10.7353 17.2363 10.6177 17.257 10.5 17.25Z" fill="white"></path>
          </svg>
        </div>
    </div>
  </div>  
</div>
</div>
