'use strict';

/**
 * @ngdoc service
 * @name steelhorseadventuresApp.routeApi
 * @description
 * # routeApi
 * Factory in the steelhorseadventuresApp.
 */
angular.module('steelhorseadventuresApp')
  .factory('routeApi', function ($resource) {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/directions/json?origin=:origin&destination=:destination&waypoints=:waypoints&travelMode=:travelMode';
    return $resource(
      url,
      {
        origin: '@_origin',
        destination: '@_destination',
        waypoints: '@_waypoints',
        travelMode: '@_travelMode'
      },
      {
        get: { url: url }
      }
    );
  });
