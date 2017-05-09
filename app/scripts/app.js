'use strict';

/**
 * @ngdoc overview
 * @name steelhorseadventuresApp
 * @description
 * # steelhorseadventuresApp
 *
 * Main module of the application.
 */
angular
  .module('steelhorseadventuresApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-leaflet',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).filter('unique', function() {
    return function (arr, field) {
      var o = {}, i, l = arr.length, r = [];
      for(i=0; i<l;i+=1) {
        o[arr[i][field]] = arr[i];
      }
      for(i in o) {
        r.push(o[i]);
      }
      return r;
    };
  });
