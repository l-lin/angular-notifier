(function() {
	'use strict';
	var app = angular.module('notifierDemoApp', ['llNotifier']);

	app.controller('demoCtrl', function($scope, notifier) {
		$scope.notify = function() {
			notifier.notify('notify');
		};
		$scope.success = function() {
			notifier.success('success');
		};
		$scope.warning = function() {
			notifier.warning('warning');
		};
		$scope.info = function() {
			notifier.info('info');
		};
		$scope.error = function() {
			notifier.error('error');
		};
	});
})();
