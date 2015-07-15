(function(){
	'use strict';
	
  angular
    .module('journalisttoolboxFrontend')
    .controller('ToolsCtrl', ToolsController);

	/** @ngInject */
	function ToolsController($http){
		var ctrl = this;
		ctrl.tools = {};
		$http({method:'GET', url: 'http://localhost:3030/api/tools'})
			.success(function(data){
				ctrl.tools = data;
		});
	}
})();