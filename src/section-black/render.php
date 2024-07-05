<div <?php echo get_block_wrapper_attributes(); ?>>
	<?php 
	$titleColor = $attributes["titleColor"] ?? "#980000";
	$title = $attributes["title"] ?? "Section";
    $titleUrl = $attributes["titleUrl"] ?? "#";
    $placeholder = get_template_directory_uri() . ('/assets/images/placeholder.png');
    $adverts = $attributes["adverts"] ?? [];
    shuffle($adverts);
    if (!function_exists('secton_black_foo')) {
        function secton_black_foo($advert){   
            if(!$advert['show']){
                return;
            }
            if ($advert['type'] == 0) {?>
            <div class="box-h">

                <?php 
                echo wp_kses_post($advert['customHtml']);
                ?>
                </div>
                <?php }
            else if ($advert['type'] == 1) {?>
            <a href="<?php echo esc_url($advert['url']) ?>" title="<?php echo $advert['text']; ?>"  class="image-container box-h" >
                <img data-src-large="<?php echo esc_url($advert['imgUrl']); ?>" data-src-small="<?php echo esc_url($advert['imgSmUrl']); ?>" alt="<?php echo $advert['text']; ?>" title="<?php echo $advert['text'];?>" class="placeholder" />  
            </a>
            <?php }
            else if ($advert['type'] == 2) { ?>
            <a  href="<?php echo esc_url($advert['url']) ?>" style="--box-color : <?php echo $advert['color']; ?>;" title="<?php echo $advert['text']; ?>"  class="image-container box-tag box box-h">
            <div class="box-tag__tag"><?php  echo $advert['tag']; ?></div>
            <picture class="box-tag__img">
                <img data-src-large="<?php echo esc_url($advert['imgUrl']); ?>" data-src-small="<?php echo esc_url($advert['imgSmUrl']); ?>" alt="<?php echo $advert['text']; ?>" title="<?php echo $advert['text'];?>" class="placeholder placeholder-tag" />  
            </picture>
            <div class="box-tag__content">
              <div class="line-clamp line-clamp--4">
                <?php  echo $advert['text']; ?>
              </div>
            </div>
            </a>
            <?php }
        }
    } ?>
	<div class="section-title-box" style="--color : <?php echo $titleColor; ?>;" >
		<a  style="--color : <?php echo $titleColor; ?>;" href="<?php  echo esc_url($titleUrl) ?>" title="<?php echo $title;  ?>" class="section-title">
			<h2  class="section-title__text"> <?php echo $title;  ?></h2>
		</a>
	</div>
    <div class="section-grid">

	<div class="grid-3" >
        <?php foreach ($adverts as $advert) { ?>
            <?php secton_black_foo($advert); 
        } ?>
          <?php 
        ?>
  </div>
<div class="banner banner-bottom">
        <?php 
            $banner_bottom = $attributes["bottomAd"];
            if(!empty($banner_bottom)) {
                if($banner_bottom['show']) {
                    if($banner_bottom['type'] == 0) {
                        echo wp_kses_post($banner_bottom['customHtml']);
                    }
                    else if ($banner_bottom['type'] == 1) {?>
                        <?php  $newTab = $banner_bottom['newTab'] ? 'target="_blank"' : ''; ?>
                        <a <?php echo $newTab; ?> href="<?php echo esc_url($banner_bottom['url']) ?>" title="<?php echo $banner_bottom['title']; ?>"  class="image-container box-h" >
                            <img data-src-large="<?php echo esc_url($banner_bottom['imgUrl']); ?>" data-src-small="<?php echo esc_url($banner_bottom['imgSmUrl']); ?>" alt="<?php echo $banner_bottom['title']; ?>" title="<?php echo $banner_bottom['title'];?>" class="placeholder" />  
                        </a>
                    <?php }
                }
            }
        ?>
</div>
</div>

</div>
