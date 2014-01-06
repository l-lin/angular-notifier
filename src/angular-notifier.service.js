(function() {
	'use strict';
	angular.module('llNotifier').
	service('notifier', function(notifierFactory) {
		/**
		 * Notify the given argument
		 * @param {JSONObject|String} args the argument to notify
		 * @param {String} notificationType the notification type
		 */
		var doNotify = function doNotify(args, notificationType) {
			var notification = notifierFactory.newNotification(args);
			if(angular.isDefined(notificationType)) {
				notification.type = notificationType;
			}
			notification.render();
		};

		/**
		 * Notify the given argument
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.notify = function notify(args) {
			doNotify(args);
		};

		/**
		 * Notify with a success type message
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.success = function success(args) {
			doNotify(args, 'success');
		};

		/**
		 * Notify with a warning type message
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.warning = function warning(args) {
			doNotify(args, 'warning');
		};

		/**
		 * Notify with an info type message
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.info = function info(args) {
			doNotify(args, 'info');
		};

		/**
		 * Notify with an error type message
		 * @param  {JSONObject|String} args the argument to notify
		 */
		this.error = function error(args) {
			doNotify(args, 'error');
		};
	});
})();