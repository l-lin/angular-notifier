(function() {
    'use strict';
    angular.module('llNotifier').
    factory('NotificationDecorator', function() {
        /**
         * A decorator that transform the given arguments into an object
         */
        function NotificationDecorator() {}

        /**
         * Transform the parameter into an object
         * @param {Object|String} args the argument to transform
         * @return {Object} the parameter transformed
         */
        NotificationDecorator.toObject = function(args) {
            var obj = args;
            if (typeof obj !== 'object') {
                obj = {
                    template: obj
                };
            }
            return obj;
        };
        return NotificationDecorator;
    }).
    factory('Notification', function($compile, $timeout, llConstants, NotificationDecorator) {
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
            var notification = NotificationDecorator.toObject(args);
            // Set the template
            this.template = notification.template ? notification.template : '';
            // Set the notification type
            this.type = notification.type ? notification.type : llConstants.DEFAULT_NOTIFICATION_TYPE;
            // Set the notification position
            this.position = notification.position ? notification.position : llConstants.DEFAULT_NOTIFICATION_POSITION;
            // Set the delay
            this.hasDelay = angular.isUndefined(notification.hasDelay) ? true : (notification.hasDelay === true);
            this.delay = angular.isDefined(notification.delay) ? notification.delay : llConstants.DEFAULT_DELAY;
            // Set notification scope
            this.scope = angular.isDefined(notification.scope) ? notification.scope : {};
        }

        Notification.prototype = {
            /**
             * Execute the given function after <code>notification.delay</code> ms.
             * Only if <code>notification.hasDelay</code> is set to true
             * @param  {Function} fn function to call
             */
            timeout: function(fn) {
                if (this.hasDelay) {
                    $timeout(function() {
                        fn();
                    }, this.delay);
                }
            }
        };

        return Notification;
    });
})();
