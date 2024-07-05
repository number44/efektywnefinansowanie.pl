<?php

use App\Api\Router;

$router = new Router();
$router->addRoute('GET', '/', 'HomeController@index');
$router->dispatch();