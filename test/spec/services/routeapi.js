'use strict';

describe('Service: routeApi', function () {

  // load the service's module
  beforeEach(module('steelhorseadventuresApp'));

  // instantiate service
  var routeApi;
  beforeEach(inject(function (_routeApi_) {
    routeApi = _routeApi_;
  }));

  it('should do something', function () {
    expect(!!routeApi).toBe(true);
  });

});
