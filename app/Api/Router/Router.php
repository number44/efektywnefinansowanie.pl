<?php

namespace App\Api\Router;

use App\Api\Controllers\AcademyContactController;
use App\Api\Controllers\AcademyController;
use App\Api\Controllers\AcademyCourseController;
use App\Api\Controllers\AcademyExtendedController;
use App\Api\Controllers\AcademyFacultyController;
use App\Api\Controllers\AcademyPromoController;
use App\Api\Controllers\AcademyTabController;
use App\Api\Controllers\AdvertController;
use App\Api\Controllers\AuthController;
use App\Api\Controllers\LogoPlatinumController;
use App\Api\Controllers\LogoGoldController;
use App\Api\Controllers\LogoSilverController;
use App\Api\Controllers\LogoBronzeController;
use App\Api\Controllers\PostController;
use App\Api\Controllers\CarouselController;
use Request;
class Router
{
    public static function academy()
    {

        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyController())::index();
                    },
                    'permission_callback' => '__return_true'
                ),
            );
            register_rest_route('studiowac/v1', '/academy', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/academy/(?P<id>\d+)',
                array (
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        return (new AcademyController())::show($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/academy/(?P<id>\d+)',
                array (
                    'methods' => 'PUT',
                    'callback' => function ($request) {
                        return (new AcademyController())::update($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/academy/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new AcademyController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );

        });
    }
    public static function login()
    {
        add_action('rest_api_init', function () {
            register_rest_route('studiowac/v1', '/login', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AuthController())::login($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function academy_course(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_course',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyCourseController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_course', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyCourseController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);

        });
    }
    public static function academy_faculty(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_faculty',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyFacultyController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_faculty', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyFacultyController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function academy_contact(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_contact',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyContactController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_contact', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyContactController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function academy_tab(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_tab',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyTabController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_tab', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyTabController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function academy_promo(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_promo',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyPromoController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_promo', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyPromoController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function advert(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/advert',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AdvertController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/advert', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AdvertController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
        });
    }
    public static function academy_extended(){
        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/academy_extended',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new AcademyExtendedController())::index();
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route('studiowac/v1', '/academy_extended', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new AcademyExtendedController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/academy_extended/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new AcademyExtendedController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
        });
    }

    //Carousel 

    public static function carousel()
    {

        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/carousel',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new CarouselController())::index();
                    },
                    'permission_callback' => '__return_true'
                ),
            );
            register_rest_route('studiowac/v1', '/carousel', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new CarouselController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/carousel/(?P<id>\d+)',
                array (
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        return (new CarouselController())::show($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/carousel/(?P<id>\d+)',
                array (
                    'methods' => 'PUT',
                    'callback' => function ($request) {
                        return (new CarouselController())::update($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/carousel/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new CarouselController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );

        });
    }
    
    // Random Posts
    public static function posts() {
        add_action('rest_api_init', function () {
        register_rest_route('studiowac/v1', '/random-posts', array(
            'methods' => 'GET',
            'callback' => function ($request) {
                return (new PostController())::get_random_posts($request);
            },
            "args" => array(
                "exclude" => array(
                  'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                    }
                ),
                "categories" => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_string($param);
                    }
                ),
               'orderby' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return in_array($param, array('latest', 'rand')); 
                    }
                )
            ),
            'permission_callback' => '__return_true'
        ));
    });
    }
    // Logos 

    public static function logo_platinum()
    {

        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/logo_platinum',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new LogoPlatinumController())::index();
                    },
                    'permission_callback' => '__return_true'
                ),
            );
            register_rest_route('studiowac/v1', '/logo_platinum', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new LogoPlatinumController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/logo_platinum/(?P<id>\d+)',
                array (
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        return (new LogoPlatinumController())::show($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_platinum/(?P<id>\d+)',
                array (
                    'methods' => 'PUT',
                    'callback' => function ($request) {
                        return (new LogoPlatinumController())::update($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_platinum/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new LogoPlatinumController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );

        });
    }

    public static function logo_gold()
    {

        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/logo_gold',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new LogoGoldController())::index();
                    },
                    'permission_callback' => '__return_true'
                ),
            );
            register_rest_route('studiowac/v1', '/logo_gold', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new LogoGoldController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/logo_gold/(?P<id>\d+)',
                array (
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        return (new LogoGoldController())::show($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_gold/(?P<id>\d+)',
                array (
                    'methods' => 'PUT',
                    'callback' => function ($request) {
                        return (new LogoGoldController())::update($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_gold/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new LogoGoldController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );

        });
    }
    public static function logo_silver()
    {

        add_action('rest_api_init', function () {
            register_rest_route(
                'studiowac/v1',
                '/logo_silver',
                array (
                    'methods' => 'GET',
                    'callback' => function () {
                        return (new LogoSilverController())::index();
                    },
                    'permission_callback' => '__return_true'
                ),
            );
            register_rest_route('studiowac/v1', '/logo_silver', [
                'methods' => 'POST',
                'callback' => function ($request) {
                    return (new LogoSilverController())::store($request);
                },
                'permission_callback' => '__return_true'
            ]);
            register_rest_route(
                'studiowac/v1',
                '/logo_silver/(?P<id>\d+)',
                array (
                    'methods' => 'GET',
                    'callback' => function ($request) {
                        return (new LogoSilverController())::show($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_silver/(?P<id>\d+)',
                array (
                    'methods' => 'PUT',
                    'callback' => function ($request) {
                        return (new LogoSilverController())::update($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );
            register_rest_route(
                'studiowac/v1',
                '/logo_silver/(?P<id>\d+)',
                array (
                    'methods' => 'DELETE',
                    'callback' => function ($request) {
                        return (new LogoSilverController())::destroy($request);
                    },
                    'permission_callback' => '__return_true'
                )
            );

        });
    }

    public static function logo_bronze()
{

    add_action('rest_api_init', function () {
        register_rest_route(
            'studiowac/v1',
            '/logo_bronze',
            array (
                'methods' => 'GET',
                'callback' => function () {
                    return (new LogoBronzeController())::index();
                },
                'permission_callback' => '__return_true'
            ),
        );
        register_rest_route('studiowac/v1', '/logo_bronze', [
            'methods' => 'POST',
            'callback' => function ($request) {
                return (new LogoBronzeController())::store($request);
            },
            'permission_callback' => '__return_true'
        ]);
        register_rest_route(
            'studiowac/v1',
            '/logo_bronze/(?P<id>\d+)',
            array (
                'methods' => 'GET',
                'callback' => function ($request) {
                    return (new LogoBronzeController())::show($request);
                },
                'permission_callback' => '__return_true'
            )
        );
        register_rest_route(
            'studiowac/v1',
            '/logo_bronze/(?P<id>\d+)',
            array (
                'methods' => 'PUT',
                'callback' => function ($request) {
                    return (new LogoBronzeController())::update($request);
                },
                'permission_callback' => '__return_true'
            )
        );
        register_rest_route(
            'studiowac/v1',
            '/logo_bronze/(?P<id>\d+)',
            array (
                'methods' => 'DELETE',
                'callback' => function ($request) {
                    return (new LogoBronzeController())::destroy($request);
                },
                'permission_callback' => '__return_true'
            )
        );

    });
    }
}

