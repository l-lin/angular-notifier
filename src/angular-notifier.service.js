(function() {
	'use strict';
	angular.module('llNotifier').
	service('notifier', function(notifierFactory) {
		/**
		 * Notify the given argument
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.notify = function notify(args) {
			var notification = notifierFactory.newNotification(args);
			notification.render();
		};
		this.success = function success(args) {
			var notification = notifierFactory.newNotification(args);
			notification.type = 'success';
			notification.render();
		};
		this.warning = function warning(args) {
			var notification = notifierFactory.newNotification(args);
			notification.type = 'warning';
			notification.render();
		};
		this.info = function info(args) {
			var notification = notifierFactory.newNotification(args);
			notification.type = 'info';
			notification.render();
		};
		this.error = function error(args) {
			var notification = notifierFactory.newNotification(args);
			notification.type = 'error';
			notification.render();
		};
	});
})();