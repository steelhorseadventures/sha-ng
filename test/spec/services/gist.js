'use strict';

describe('Service: gist', function () {

  // load the service's module
  beforeEach(module('steelhorseadventuresApp'));

  // instantiate service
  var gist;
  beforeEach(inject(function (_gist_) {
    gist = _gist_;
  }));

  it('should do something', function () {
    expect(!!gist).toBe(true);
  });

});
