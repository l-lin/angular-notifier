(function() {
    'use strict';
    angular.module('llNotifier').
    factory('NotificationDecorator', function() {
        /**
         * A decorator that transform the given arguments into an object
         * @param {Object|String} args the argument to transform
         */
        function NotificationDecorator(args) {
            this.params = args;
        }
        NotificationDecorator.prototype = {
            /**
             * Transform the parameter into an object
             * @return {Object} the parameter transformed
             */
            toObject: function() {
                var obj = this.params;
                if (typeof obj !== 'object') {
                    obj = {
                        template: obj
                    };
                }
                return obj;
            }
        };
        return NotificationDecorator;
    }).
    factory('llNotificationScopeFactory', function($rootScope, $timeout) {
        return {
            /**
             * Create and configure a new scope for the notification
             * @param  {Object} notification the notification
             * @param  {Object} notificationScope the scope for the notification
             * @return {scope} the new scope for the notification
             */
            newConfiguredScope: function(notification, notificationScope) {
                var scope = $rootScope.$new();
                scope.isShown = true;

                if (typeof notificationScope === 'object') {
                    for (var key in notificationScope) {
                        scope[key] = notificationScope[key];
                    }
                }

                scope.type = notification.type;
                scope.position = notification.position;
                scope.hasTimeout = notification.hasTimeout;
                scope.timeout = notification.timeout;

                /**
                 * Close the notification
                 * @return {[type]} [description]
                 */
                scope.closeNotification = function() {
                    scope.isShown = false;
                };

                if (notification.hasTimeout) {
                    $timeout(function() {
                        scope.isShown = false;
                    }, notification.timeout);
                }

                return scope;
            }
        };
    }).
    factory('Notification', function($compile, llConstants, NotificationDecorator, llNotificationScopeFactory) {
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
        function Notification(args) {
            // Set the message
            var notification = new NotificationDecorator(args).toObject();
            // Set the template
            this.template = notification.template ? notification.template : '';
            // Set the notification type
            this.type = notification.type ? notification.type : llConstants.DEFAULT_NOTIFICATION_TYPE;
            // Set the notification position
            this.position = notification.position ? notification.position : llConstants.DEFAULT_NOTIFICATION_POSITION;
            // Set the timeout
            this.hasTimeout = angular.isUndefined(notification.hasTimeout) ? true : (notification.hasTimeout === true);
            this.timeout = angular.isDefined(notification.timeout) ? notification.timeout : llConstants.DEFAULT_TIMEOUT;
            // Set notification scope
            this.scope = llNotificationScopeFactory.newConfiguredScope(this, angular.isDefined(notification.scope) ? notification.scope : {});
        }

        Notification.prototype = {
            /**
             * Render the notification
             * @throw an error if it cannot load the template
             */
            render: function() {
                var template = '<ll-notification type="type" position="position" has-timeout="hasTimeout" timeout="timeout">' +
                    this.template + '</ll-notification>',
                    templateElement = $compile(template)(this.scope),
                    bodyElement = angular.element(document).find('body');
                bodyElement.append(templateElement);
            }
        };

        return Notification;
    });
})();
