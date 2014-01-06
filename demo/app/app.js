(function() {
	'use strict';
	var app = angular.module('notifierDemoApp', ['llNotifier']);

	app.controller('demoCtrl', function($scope, notifier) {
		$scope.demoText = 'foobar';
		$scope.notify = function() {
			notifier.notify($scope.demoText);
		};
		$scope.success = function() {
			notifier.success($scope.demoText);
		};
		$scope.warning = function() {
			notifier.warning($scope.demoText);
		};
		$scope.info = function() {
			notifier.info($scope.demoText);
		};
		$scope.error = function() {
			notifier.error($scope.demoText);
		};

		$scope.demoNotification = {
			message: 'Custom notification',
			hasTimeout: true,
			timeout: 3000,
			type: 'info',
			position: 'top center'
		};
		$scope.customNotify = function() {
			notifier.notify($scope.demoNotification);
		};
	});
})();
