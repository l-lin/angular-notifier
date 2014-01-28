(function() {
	'use strict';
	var app = angular.module('notifierDemoApp', ['llNotifier']);

	app.controller('demoCtrl', function($scope, notifier) {
		$scope.demoText = 'foobar';
		$scope.notify = function() {
			notifier.notify($scope.demoText);
		};

		$scope.demoNotification = {
			template: 'Custom notification',
			hasDelay: true,
			delay: 3000,
			type: 'info',
			position: 'top center'
		};
		$scope.customNotify = function() {
			notifier.notify($scope.demoNotification);
		};

		var notification = {
			template: '<h3 ng-click="openNestedNotification()">Click me!</h3>',
			scope: {
				openNestedNotification: function() {
					notifier.notify({template: 'I am a nested notification!', type: 'success', position: 'top right'});
				}
			},
			hasDelay: false
		};
		$scope.nestedNotification = function() {
			notifier.notify(notification);
		};
	});
})();
