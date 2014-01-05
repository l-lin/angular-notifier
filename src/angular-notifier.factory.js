(function() {
	'use strict';
	angular.module('llNotifier').
	factory('notifierFactory', function($timeout, $rootScope, $compile, $http, $templateCache, llNotifierTemplateUrl, llConstants) {
		/**
		 * Fetch the llNotifierTemplateName content.
		 * @param  {String} templateUrl the template URL
		 * @return {promise} the promise to fetch the template content
		 */
		function fetchTemplateContent(templateUrl) {
			return $http.get(templateUrl,{cache: $templateCache});
		}

		/**
		 * Create and configure a new scope for the notification 
		 * @param  {JSONObject} notification the notification
		 * @return {scope} the new scope for the notification
		 */
		function createScopeAndConfigure(notification) {
			var scope = $rootScope.$new();
			scope.message = notification.message;
			scope.isShown = true;

			if (typeof notification.scope === 'object'){
				for (var key in notification.scope){
					scope[key] = notification.scope[key];
				}
			}
			scope.closeMsg = function() {
				scope.isShown = false;
			};

			if(notification.hasTimeout) {
				$timeout(function() {
	                scope.isShown = false;
	            }, notification.timeout);
			}

			return scope;
		}

		/**
		 * Create the template element from a given template content
		 * @param  {String} template the template content
		 * @param  {scope} scope the scope to link to the template element
		 * @return {angular.element} the template element
		 */
		function createTemplateElement(template, scope) {
			return $compile(template)(scope);
		}

		return {
			/**
			 * Create a new notification given an argument.
			 * Returns a JSON Object. Return object example:
			 * {
			 *   message: 'notificationMessage'
			 *   templateUrl: 'src/angular-notifier.html'
			 *   scope: {
			 *     foo: 'foo',
			 *     bar: 'bar'
			 *   }
			 * }
			 * 
			 * @param  {JSONObject|String} args the arguments of the notification
			 * @return {JSONObject} a JSON object with the following attributes:
			 */
			newNotification: function(args) {
				var notification = args;
				// Set the message
				if (typeof notification !== 'object') {
					notification = {message:notification};
				}
				// Set the templateUrl
				notification.templateUrl = notification.templateUrl ? notification.templateUrl : llNotifierTemplateUrl;
				// Set the scope
				notification.scope = angular.isUndefined(args.scope) ? {} : args.scope;
				// Set the notification type
				notification.type = notification.type ? notification.type : llConstants.DEFAULT_NOTIFICATION_TYPE;
				// Set the notification position
				notification.position = notification.position ? notification.position : llConstants.DEFAULT_NOTIFICATION_POSITION;
				// Set the timeout
				if (angular.isUndefined(args.timeout) || !angular.isNumber(args.timeout)) {
					notification.timeout = llConstants.DEFAULT_TIMEOUT;
				}
				// Define the render function
				notification.render = function() {
					var _this = this;
					fetchTemplateContent(_this.templateUrl).success(function(template){
						var scope = createScopeAndConfigure(notification),
							templateElement = createTemplateElement(template, scope),
							bodyElement = angular.element(document).find('body');
						templateElement.addClass(_this.type);
						templateElement.addClass(_this.position);
						bodyElement.append(templateElement);
					}).error(function(data){
						throw new Error('Template specified for llNotifier (' + notification.template + ') could not be loaded. ' + data);
					});
				};
				return notification;
			}
		};
	});
})();