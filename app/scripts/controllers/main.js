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
        if (!(thingList[i].hide) && !!(thingList[i].date)) {
          $scope.things.push({
            date: new Date(thingList[i].date),
            summary: thingList[i].description,
            url: thingList[i].url
          });
        }
      }
      $scope.things.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      });
    });
  });
