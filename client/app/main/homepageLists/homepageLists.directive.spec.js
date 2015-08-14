'use strict';

describe('Directive: homepageLists', function () {

  // load the directive's module and view
  beforeEach(module('jtApp'));
  beforeEach(module('app/main/homepageLists/homepageLists.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<homepage-lists></homepage-lists>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the homepageLists directive');
  }));
});