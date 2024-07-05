<?php
namespace App\Api;

use App\Api\Controllers\AcademyController;
use App\Api\Model\Academy;
use App\Api\Model\AcademyContact;
use App\Api\Model\AcademyCourse;
use App\Api\Model\AcademyExtended;
use App\Api\Model\AcademyFaculty;
use App\Api\Model\AcademyPromo;
use App\Api\Model\AcademyTab;
use App\Api\Model\Advert;
use App\Api\Model\Carousel;
use App\Api\Model\LogoBronze;
use App\Api\Model\LogoGold;
use App\Api\Model\LogoPlatinum;
use App\Api\Model\LogoSilver;
use App\Api\Router\Router;

class Api
{
    /**
     * Register any application services.
     *
     * @return void
     */
    static function register()
    {
        $academy = new Academy();
        $academy::create();
        $academy_course = new AcademyCourse();
        $academy_course::create();
        $academy_faculty = new AcademyFaculty();
        $academy_faculty::create();
        $academy_contact = new AcademyContact();
        $academy_contact::create();
        $academy_tab = new AcademyTab();
        $academy_tab::create();
        $academy_promo = new AcademyPromo();
        $academy_promo::create();
        $academy_extended = new AcademyExtended();
        $academy_extended::create();


        $advert = new Advert();
        $advert::create();
        

        $carousel = new Carousel();
        $carousel::create();

        $logo_platinum = new LogoPlatinum();
        $logo_platinum::create();
        $logo_gold = new LogoGold();
        $logo_gold::create();
        $logo_silver = new LogoSilver();
        $logo_silver::create();
        $logo_bronze = new LogoBronze();
        $logo_bronze::create();
        
        $router = new Router();


        $router::academy();
        $router::login();
        $router::academy_course();
        $router::academy_faculty();
        $router::academy_contact();
        $router::academy_tab();
        $router::academy_promo();
        $router::advert();
        $router::academy_extended();


        $router::carousel();
        $router::posts();


        $router::logo_platinum();
        $router::logo_gold();
        $router::logo_silver();
        $router::logo_bronze();
    }
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }
}


