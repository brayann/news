'use strict';
var appControllers  = angular.module('newsApp.Controllers', []);
var appServices     = angular.module('newsApp.Services', []);
var APP = angular.module('newsApp', [
    'newsApp.Controllers',
    'newsApp.Services'
]);
APP.config( function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});