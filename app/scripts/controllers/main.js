'use strict';

/**
 * @ngdoc function
 * @name steelhorseadventuresApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the steelhorseadventuresApp
 */
angular.module('steelhorseadventuresApp')
  .controller('MainCtrl', function ($scope, thingApi) {
    $scope.things = [];
    thingApi.query({org: 'steelhorseadventures', repo: 'sha-content', file: 'things.json'}, function (thingList) {
      for (var i in thingList) {
        if (!(thingList[i].hide) && !!(thingList[i].id)) {
          $scope.things.push({
            title: thingList[i].title,
            countries: thingList[i].countries,
            pictures: thingList[i].pictures,
            waypoints: thingList[i].waypoints,
            summary: thingList[i].description,
            map: thingList[i].map,
            facebook: thingList[i].facebook
          });
        }
      }
    });
  });
