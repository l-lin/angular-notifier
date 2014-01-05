(function() {
	'use strict';
	angular.module('notifier').
	factory('notifierFactory', function() {
		return {
			newNotification: function() {
				return {};
			}
		};
	});
})();