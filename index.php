<?php
/**
 * Created by PhpStorm.
 * User: brayan
 * Date: 6/11/16
 * Time: 2:31 PM
 */
require 'vendor/autoload.php';
use Respect\Rest\Router;

$router = new Router();

$router->get('/load', function () {
    $controller = new News\NewsController;
    return $controller->process();
});

$router->get('/', function() {
    include_once('public/index.html');
});