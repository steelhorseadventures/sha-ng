'use strict';

/**
 * @ngdoc service
 * @name steelhorseadventuresApp.thingApi
 * @description
 * # thingApi
 * Factory in the steelhorseadventuresApp.
 */
angular.module('steelhorseadventuresApp')
  .factory('thingApi', function ($resource) {
    var thingsUrl = 'https://raw.githubusercontent.com/:org/:repo/master/:file';
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return $resource(
      thingsUrl + '?' + (Math.floor(Math.random() * (max - min)) + min),
      {
        org: '@_org',
        repo: '@_repo',
        file: '@_file'
      },
      {
        get: {
          url: thingsUrl 
        },
        query: {
          isArray: true
        }
      }
    );
  });
