<?php
if (!function_exists('AdvertFoo')) {
        function AdvertFoo($advert){   
            if(!$advert['show']){
                return;
            }
            if ($advert['type'] == 0) {?>
                <?php 
                echo wp_kses_post($advert['customHtml']);
                ?>
                <?php }
            else if ($advert['type'] == 1) {?>
            <a href="<?php echo esc_url($advert['url']) ?>" title="<?php echo $advert['text']; ?>"  class="image-container" >
                <img data-src-large="<?php echo esc_url($advert['imgUrl']); ?>" data-src-small="<?php echo esc_url($advert['imgSmUrl']); ?>" alt="<?php echo $advert['text']; ?>" title="<?php echo $advert['text'];?>" class="placeholder" />  
            </a>
            <?php }
            else if ($advert['type'] == 2) { ?>
            <a href="<?php echo esc_url($advert['url']) ?>" style="--box-color : <?php echo $advert['color']; ?>;" title="<?php echo $advert['text']; ?>"  class="image-container box-tag box" >
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