<?php
namespace App\Components;

class Adverts 
{
    public static function generate_advert($advert) 
    {
        if (!$advert['show']) {
            return '';
        }

        ob_start();

        switch ($advert['type']) {
            case 0:
                echo wp_kses_post($advert['customHtml']);
                break;

            case 1:
                self::render_image_advert($advert);
                break;

            case 2:
                self::render_box_tag_advert($advert);
                break;
        }

        return ob_get_clean();
    }

    private static function render_image_advert($advert)
    {
        ?>
        <a href="<?php echo esc_url($advert['url']); ?>" title="<?php echo esc_attr($advert['text']); ?>" class="image-container">
            <img data-src-large="<?php echo esc_url($advert['imgUrl']); ?>" data-src-small="<?php echo esc_url($advert['imgSmUrl']); ?>" alt="<?php echo esc_attr($advert['text']); ?>" title="<?php echo esc_attr($advert['text']); ?>" class="placeholder" />
        </a>
        <?php
    }

    private static function render_box_tag_advert($advert)
    {
        ?>
        <a href="<?php echo esc_url($advert['url']); ?>" style="--box-color: <?php echo esc_attr($advert['color']); ?>;" title="<?php echo esc_attr($advert['text']); ?>" class="image-container box-tag box">
            <div class="box-tag__tag"><?php echo esc_html($advert['tag']); ?></div>
            <picture class="box-tag__img">
                <img data-src-large="<?php echo esc_url($advert['imgUrl']); ?>" data-src-small="<?php echo esc_url($advert['imgSmUrl']); ?>" alt="<?php echo esc_attr($advert['text']); ?>" title="<?php echo esc_attr($advert['text']); ?>" class="placeholder placeholder-tag" />
            </picture>
            <div class="box-tag__content">
                <div class="line-clamp line-clamp--4">
                    <?php echo esc_html($advert['text']); ?>
                </div>
            </div>
        </a>
        <?php
    }
}
