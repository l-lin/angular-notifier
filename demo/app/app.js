(function() {
	'use strict';
	var app = angular.module('notifierDemoApp', ['notifier']);

	app.controller('demoCtrl', function($scope) {
		$scope.name = 'foo';
	});
})();
