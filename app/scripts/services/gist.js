'use strict';

/**
 * @ngdoc service
 * @name steelhorseadventuresApp.gist
 * @description
 * # gist
 * Factory in the steelhorseadventuresApp.
 */
angular.module('steelhorseadventuresApp')
  .factory('gist', function ($resource) {
    var gistsUrl = 'https://api.github.com/users/:username/gists';
    return $resource(
      gistsUrl,
      {
        username: '@_username',
        id: '@_id'
      },
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        },
        get: {
          url: gistsUrl + '/:id'
        },
        query: {
          isArray: true
        }
      }
    );
  });
