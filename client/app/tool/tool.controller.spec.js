'use strict';

describe('Controller: ToolCtrl', function () {

  // load the controller's module
  beforeEach(module('jtApp'));

  var ToolCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ToolCtrl = $controller('ToolCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
