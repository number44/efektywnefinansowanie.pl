<div class="boxes">
        <?php
          $post = get_post($posts[0]);
          if(!empty($post)){?>
          <?php 
           $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small');
           $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large');
          ?>
            <a style="--box-color : <?php echo $titleColor; ?>;" href="<?php echo get_permalink($post->ID); ?>" title="<?php  echo $post->post_title; ?>" class="box-lg box-orange box">
              <div class="box-lg__text"><?php  echo $post->post_title;  ?></div>
                  <picture class="box-lg__img">
                  <?php  if(has_post_thumbnail($post)) {?>
                    <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo $post->post_title; ?>" title="<?php echo $advert['text'];?>" class="placeholder placeholder-tag" />  
                  <?php }
                  else {?> <img src="<?php  echo esc_url($placeholder) ?>" alt="placeholder" /><?php }
                  ?> 
                  </picture>
            </a>
            <?php unset($thumbnail_url_large , $thumbnail_url_small , $post)  ?>
          <?php } ?>
        <?php 
          $post = get_post($posts[1]) ;
          if(!empty($post)){?>
             <?php 
           $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small');
           $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large');
          ?>
          <a style="--box-color : <?php echo $titleColor; ?>;" href="<?php echo get_permalink($post->ID);  ?>" title="<?php echo $post->post_title ?>" class="box-sm box-orange box ">
              <picture class="box-sm__img">
                <?php  if(has_post_thumbnail($post)) {?>
                    <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo $post->post_title; ?>" title="<?php echo $advert['text'];?>" class="placeholder placeholder-tag" />  
                <?php }
                else {?> <img src="<?php  echo esc_url($placeholder) ?>" alt="placeholder" /><?php }?> 
              </picture>
              <div class="box-sm__content">
                <div class="line-clamp line-clamp--4">
                    <?php 
                      echo $post->post_title;
                    ?>
                </div>
              </div>
            </a>
            <?php unset($thumbnail_url_large , $thumbnail_url_small , $post)  ?>
          <?php } ?>
          <?php 
          $post = get_post($posts[2]) ;
          if(!empty($post)){?>
             <?php 
           $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small');
           $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large');
          ?>
            <a style="--box-color : <?php echo $titleColor; ?>;" href="<?php echo get_permalink($post->ID);  ?>" title="<?php echo $post->post_title ?>" class="box-sm box-orange box ">
              <picture class="box-sm__img">
              <?php  if(has_post_thumbnail($post)) {?>
                    <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo $post->post_title; ?>" title="<?php echo $advert['text'];?>" class="placeholder placeholder-tag" />  
                <?php } 
                 else {?> <img src="<?php  echo esc_url($placeholder) ?>" alt="placeholder" /><?php }?> 
              </picture>
              <div class="box-sm__content">
                <div class="line-clamp line-clamp--4">
                    <?php 
                      echo $post->post_title;
                    ?>
                </div>
              </div>
            </a>
            <?php unset($thumbnail_url_large , $thumbnail_url_small , $post)  ?>
          
            <?php } ?>
      
      </div>