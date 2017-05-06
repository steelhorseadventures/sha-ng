'use strict';

describe('Service: thingApi', function () {

  // load the service's module
  beforeEach(module('steelhorseadventuresApp'));

  // instantiate service
  var thingApi;
  beforeEach(inject(function (_thingApi_) {
    thingApi = _thingApi_;
  }));

  it('should do something', function () {
    expect(!!thingApi).toBe(true);
  });

});
