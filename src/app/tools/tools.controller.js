(function(){
	'use strict';
	
  angular
    .module('journalisttoolboxFrontend')
    .controller('ToolsCtrl', ToolsController);

	/** @ngInject */
	function ToolsController($http, $stateParams){
		var ctrl = this;
		ctrl.tools = {};
		$http({method:'GET', url: 'http://localhost:3030/api/tools/category/' + $stateParams.cat})
			.success(function(data){
				ctrl.tools = data;
		});
	}
})();