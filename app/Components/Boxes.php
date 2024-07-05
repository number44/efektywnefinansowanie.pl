<?php
namespace App\Components;

class Boxes
{
    public static function generate_md_box($post_id, $placeholder, $titleColor, $hideOnLarge = false, $hideOnSmall = false) {
        $post = get_post($post_id);
        if (!empty($post)) {
            $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small') ?: $placeholder;
            $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large') ?: $placeholder;

            $classes = 'section-box box-md box';
            $classes .= $hideOnLarge ? ' hide-on-large' : '';
            $classes .= $hideOnSmall ? ' hide-on-small' : '';

            ob_start();
            ?>
            <a style="--box-color: <?php echo esc_attr($titleColor); ?>;" href="<?php echo esc_url(get_permalink($post->ID)); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="<?php echo esc_attr($classes); ?>">
                <picture class="box-md__img">
                    <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo esc_attr($post->post_title); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="placeholder placeholder-tag box-md__img" />  
                </picture>
                <div class="box-md__content">
                    <div class="line-clamp line-clamp--4">
                        <?php echo esc_html($post->post_title); ?>
                    </div>
                </div>
            </a>
            <?php
            $output = ob_get_clean();
            return $output;
        }
        return '';
    }

    public static function generate_sm_box($post_id, $placeholder, $titleColor, $hideOnLarge = false, $hideOnSmall = false) {
        $post = get_post($post_id);
        if (!empty($post)) {
            $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small') ?: $placeholder;
            $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large') ?: $placeholder;
            $classes = 'box-sm box-orange box';
            $classes .= $hideOnLarge ? ' hide-on-large' : '';
            $classes .= $hideOnSmall ? ' hide-on-small' : '';

            ob_start();
            ?>
            <a style="--box-color: <?php echo esc_attr($titleColor); ?>;" href="<?php echo esc_url(get_permalink($post->ID)); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="<?php echo esc_attr($classes); ?>">
                <picture class="box-sm__img">
                    <?php if (has_post_thumbnail($post)) { ?>
                        <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo esc_attr($post->post_title); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="placeholder placeholder-tag" />
                    <?php } else { ?>
                        <img src="<?php echo esc_url($placeholder); ?>" alt="placeholder" />
                    <?php } ?>
                </picture>
                <div class="box-sm__content">
                    <div class="line-clamp line-clamp--4">
                        <?php echo esc_html($post->post_title); ?>
                    </div>
                </div>
            </a>
            <?php
            $output = ob_get_clean();
            return $output;
        }
        return '';
    }

    public static function generate_lg_box($post_id, $placeholder, $titleColor, $hideOnLarge = false, $hideOnSmall = false) {
        $post = get_post($post_id);
        if (!empty($post)) {
            $thumbnail_url_small = get_the_post_thumbnail_url($post->ID, 'small') ?: $placeholder;
            $thumbnail_url_large = get_the_post_thumbnail_url($post->ID, 'large') ?: $placeholder;

            $classes = 'box-lg box';
            $classes .= $hideOnLarge ? ' hide-on-large' : '';
            $classes .= $hideOnSmall ? ' hide-on-small' : '';

            ob_start();
            ?>
            <a style="--box-color: <?php echo esc_attr($titleColor); ?>;" href="<?php echo esc_url(get_permalink($post->ID)); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="<?php echo esc_attr($classes); ?>">
                <div class="box-lg__text"><?php echo esc_html($post->post_title); ?></div>
                <picture class="box-lg__img">
                    <?php if (has_post_thumbnail($post)) { ?>
                        <img data-src-large="<?php echo esc_url($thumbnail_url_large); ?>" data-src-small="<?php echo esc_url($thumbnail_url_small); ?>" alt="<?php echo esc_attr($post->post_title); ?>" title="<?php echo esc_attr($post->post_title); ?>" class="placeholder placeholder-tag" />
                    <?php } else { ?>
                        <img src="<?php echo esc_url($placeholder); ?>" alt="placeholder" />
                    <?php } ?>
                </picture>
            </a>
            <?php
            $output = ob_get_clean();
            return $output;
        }
        return '';
    }
}
