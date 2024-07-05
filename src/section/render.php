
<?php
use App\Components\Boxes;
use App\Components\Adverts;
use App\Components\Slider;
use App\Helpers\Logos;

?>
<?php
    $unique_id = wp_unique_id('p-');
    $titleColor = $attributes["titleColor"] ?? "#980000";
	$title = $attributes["title"] ?? "Section";
    $titleUrl = $attributes["titleUrl"] ?? "#";
    $posts = $attributes["posts"] ?? [];
    shuffle($posts);
    $placeholder = get_template_directory_uri() . ('/assets/images/placeholder.png');
    $adverts = $attributes["adverts"] ?? [];
    $showCarousel = $attributes["showCarousel"] ?? false;
    $logos = Logos::getLogoGold() ?? [];
    shuffle($logos);
    $logos_sliced = array_slice($logos, 0, 6);
    $slide_size = ceil(count($logos_sliced) / 3);
    $slides = array_chunk($logos_sliced, $slide_size) ?? [];
?>
<div <?php echo get_block_wrapper_attributes(); ?>> 
    <div class="section-title-box" style="--color : <?php echo $titleColor; ?>;" >
    		<a  style="--color : <?php echo $titleColor; ?>;" href="<?php  echo esc_url($titleUrl) ?>" title="<?php echo $title;  ?>" class="section-title">
    			<h2  class="section-title__text"> <?php echo $title;  ?> </h2>
    		</a>
    </div>
    <div class="section-grid">
            <div class="section-content">
                <div class="boxes">
                    <?php 
                    echo Boxes::generate_lg_box($posts[0], $placeholder, $titleColor);
                    echo Boxes::generate_sm_box($posts[1], $placeholder, $titleColor ,false ,true);
                    echo Boxes::generate_sm_box($posts[2], $placeholder, $titleColor , false , true);
                    echo Boxes::generate_md_box($posts[3], $placeholder, $titleColor ,true , false);
                    echo Boxes::generate_md_box($posts[4], $placeholder, $titleColor , true , false);
                    ?>
                    <div class="hide-on-large adverts-small">
                        <?php echo Adverts::generate_advert($adverts[0]);  ?>
                        <?php echo Adverts::generate_advert($adverts[1]);  ?>
                    </div>
                    <?php
                    if($showCarousel){
                        echo Slider::getSlider($slides); 
                        
                    }
                    ?>
                    <?php
                    echo Boxes::generate_md_box($posts[5], $placeholder, $titleColor);
                    echo Boxes::generate_md_box($posts[6], $placeholder, $titleColor);
                    echo Boxes::generate_md_box($posts[7], $placeholder, $titleColor);
                    echo Boxes::generate_md_box($posts[8], $placeholder, $titleColor);
                    ?>
                </div>
            </div>
        <div class="section-sidebar">
            <?php foreach ($adverts as $advert) {
                echo Adverts::generate_advert($advert);
            }?>
        </div>
    </div>
</div>