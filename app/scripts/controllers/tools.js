'use strict';

/**
 * @ngdoc function
 * @name steelhorseadventuresApp.controller:ToolsCtrl
 * @description
 * # ToolsCtrl
 * Controller of the steelhorseadventuresApp
 */
angular.module('steelhorseadventuresApp')
  .controller('ToolsCtrl', function ($scope, routeApi) {
    $scope.waypoints = [{},{}];
    function containsGeometry(point){
      return (point.hasOwnProperty('response') && point.response.hasOwnProperty('geometry')) || (point.response != undefined && point.response.geometry != undefined);
    }
    function containsResponse(point){
      return point.response != undefined;
    }
    function decode(polyline) {
      if (!polyline) {
        return [];
      }
      var points = [];
      var index = 0, len = polyline.length;
      var latitude = 0, longitude = 0;
      while (index < len) {
        var b, shift = 0, result = 0;
        do {
          b = polyline.charCodeAt(index++) - 63;
          result = result | ((b & 0x1f) << shift);
          shift += 5;
        } while (b >= 0x20);
        var dlatitude = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
        latitude += dlatitude;
        shift = 0;
        result = 0;
        do {
          b = polyline.charCodeAt(index++) - 63;
          result = result | ((b & 0x1f) << shift);
          shift += 5;
        } while (b >= 0x20);
        var dlongitude = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
        longitude += dlongitude;
        points.push([(latitude / 1e5), (longitude / 1e5)]);
      }
      return points;
    }
    function toDegree(rad) { return rad * 180 / Math.PI; }
    function toRadian(degr) { return degr * Math.PI / 180; }
    function getCenter(points) {
      var sumX = 0;
      var sumY = 0;
      var sumZ = 0;
      for (var i = 0; i < points.length; i++) {
        var lat = toRadian(points[i][0]);
        var lng = toRadian(points[i][1]);
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
      }
      var avgX = sumX / points.length;
      var avgY = sumY / points.length;
      var avgZ = sumZ / points.length;
      var lng = Math.atan2(avgY, avgX);
      var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
      var lat = Math.atan2(avgZ, hyp);
      return ([toDegree(lat), toDegree(lng)]);
    }
    function getZoom(bounds, mapDim) {
      var WORLD_DIM = { height: 256, width: 256 };
      var ZOOM_MAX = 21;
      function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }
      function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }
      var latFraction = (latRad(bounds.northeast.lat) - latRad(bounds.southwest.lat)) / Math.PI;
      var lngDiff = bounds.northeast.lng - bounds.southwest.lng;
      var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
      var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
      var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
      return Math.min(latZoom, lngZoom, ZOOM_MAX);
    }
    $scope.route = {
      center: {lat:0,lng:0,zoom:1},
      paths: {p1:{color:'#33adff',weight:5,latlngs:[]}}
    };
    $scope.getRoute = function(waypoints) {
      if (waypoints.every(containsResponse)){
        $scope.loading = true;
        var params = {
          travelMode: 'DRIVING',
          origin: waypoints[0].response.geometry.location.lat() + ',' + waypoints[0].response.geometry.location.lng(),
          destination: waypoints[waypoints.length - 1].response.geometry.location.lat() + ',' + waypoints[waypoints.length - 1].response.geometry.location.lng(),
          waypoints: ((waypoints.length > 2) ? waypoints.slice(1,-1).map(function(p) {return p.response.geometry.location.lat() + ',' + p.response.geometry.location.lng();}).join('|') : '')
        };
        routeApi.get(params, function (routeResponse) {
          $scope.loading = false;
          var bounds = routeResponse.routes[0].bounds;
          var leg = routeResponse.routes[0].legs[0];
          var polyline = routeResponse.routes[0].overview_polyline.points;
          var points = decode(polyline);
          var center = getCenter(points);
          var zoom = getZoom(bounds,{height:480,width:700});
          $scope.summary = {
            map: {
              center: {lat:center[0],lng:center[1],zoom:zoom},
              bounds: bounds,
              distance: leg.distance,
              duration: leg.duration,
              polyline: polyline,
              paths: {p1:{color:'#33adff',weight:5,latlngs:points}}
            },
            params: params,
            response: routeResponse
          };
          $scope.route = {
            center: {lat:center[0],lng:center[1],zoom:zoom},
            paths: {p1:{color:'#33adff',weight:5,latlngs:points}}
          };
        });
      }
    }
  });