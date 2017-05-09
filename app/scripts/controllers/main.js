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
    var theWholeRoute = [];
    var allTheCountries = [];
    $scope.allTheDistance = 0;
    thingApi.query({org: 'steelhorseadventures', repo: 'sha-content', file: 'things.json'}, function (thingList) {
      for (var i in thingList) {
        if (!(thingList[i].hide) && !!(thingList[i].id)) {
          theWholeRoute.push.apply(theWholeRoute, thingList[i].map.paths.p1.latlngs);
          allTheCountries.push.apply(allTheCountries, thingList[i].countries);
          $scope.allTheDistance += thingList[i].map.distance.value;
          $scope.things.push({
            title: thingList[i].title,
            header_picture: thingList[i].header_picture,
            countries: thingList[i].countries,
            pictures: thingList[i].pictures,
            waypoints: thingList[i].waypoints,
            summary: thingList[i].description,
            map: thingList[i].map,
            facebook: thingList[i].facebook,
            duration: [
              'roughly ' + thingList[i].map.duration.text,
              thingList[i].map.duration.text + ' or something like that',
              thingList[i].map.duration.text + ', honestly, officer',
              thingList[i].map.duration.text + ', or thereabouts',
              'maybe ' + thingList[i].map.duration.text,
              'close enough to ' + thingList[i].map.duration.text,
              'something like ' + thingList[i].map.duration.text,
            ][Math.floor(Math.random()*7)]
          });
        }
      }
    });
    $scope.allTheCountries = allTheCountries;
    $scope.theWholeRoute = {p1:{color:'#33adff',weight:5,latlngs:theWholeRoute}};
  });
