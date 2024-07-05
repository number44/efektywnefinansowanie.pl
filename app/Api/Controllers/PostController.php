<?php
namespace App\Api\Controllers;
use App\Api\Controllers\Controller;
use WP_Query;
use WP_REST_Response;
class PostController extends Controller
{
    public function __construct()
    {
    }
    public static function get_random_posts($request) {
        $exclude = $request->get_param('exclude');
        $categories = $request->get_param('categories');
        $orderby = $request->get_param('orderby');
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => 9,
            'post_status' => 'publish'
        );
        if ($orderby === 'latest') {
            $args['orderby'] = 'date';
            $args['order'] = 'DESC';
        } else {
            $args['orderby'] = 'rand';
        }
       
        if (!empty($exclude)) {
            $args['post__not_in'] = explode(',', $exclude);
        }
    
        if (!empty($categories)) {
            $args['category__in'] = explode(',', $categories);
        }
    
       
        $query = new WP_Query($args);
        $posts = array();
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $posts[] = array(
                    'id' => get_the_ID(),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'excerpt' => get_the_excerpt(),
                    'link' => get_permalink(),
                    'date' => get_the_date('Y-m-d'),
                    "featured_image" => get_the_post_thumbnail_url(),
                );
            }
            wp_reset_postdata();
        }
    
        // error_log(print_r($posts, true));
    
        return new WP_REST_Response($posts, 200);
    }
}
