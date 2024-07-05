
<?php
use App\Components\Boxes;
use App\Components\Adverts;
use App\Components\Slider;
use App\Helpers\Logos;

?>
<?php
    $unique_id = wp_unique_id('p-');
	$title = $attributes["title"] ?? "Section";
	$titleSm = $attributes["titleSm"] ?? "Section";
    $titleUrl = $attributes["titleUrl"] ?? "#";
    $logos = Logos::getLogoBronze() ?? [];
    shuffle($logos);
    $logos_sliced = array_slice($logos, 0, 16);
    $logos_sliced_large = array_slice($logos, 0, 12);
    $slide_size = ceil(count($logos_sliced) / 4);
    $slides = array_chunk($logos_sliced, $slide_size) ?? [];
    $x = count($slides);
?>
<div <?php echo get_block_wrapper_attributes(); ?>> 
    <a class="bottom-heading" href="<?=  esc_url($titleUrl) ?>" title=<?php  echo $title;   ?>>
        <div class="horizontal-line"></div>     
        <h2 class="heading hide-on-large">
                <?php  
                echo wp_kses_post($titleSm);
                ?>
            </h2>
            <h2 class="heading  hide-on-small">
                <?php  echo wp_kses_post($title); ?>
            </h2>    
    </a>
    <?php 
        
    ?>
    <?php
        echo Slider::getBottomSlider($slides) ?? "";
    ?>
    <div class="bottom-logos-grid hide-on-small">
        <?php foreach ($logos_sliced_large as $logo) { ?>
            <a href="<?php echo $logo->url; ?>" class="bottom-logos-grid__logo logos-bottom__logo logo" title="<?php  echo $logo->title   ?>">
                <img class="placeholder" data-src-small="<?php echo $logo->imgSmUrl; ?>" data-src-large="<?php echo $logo->imgUrl; ?>" alt="<?php echo $logo->alt; ?>">
            </a>
            <?php }  ?>
    </div>
</div>