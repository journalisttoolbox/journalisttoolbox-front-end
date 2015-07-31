'use strict';

describe('Directive: grid', function () {

  // load the directive's module and view
  beforeEach(module('jtApp'));
  beforeEach(module('app/main/grid/grid.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<grid></grid>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the grid directive');
  }));
});