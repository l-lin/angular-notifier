(function() {
    'use strict';
    angular.module('llNotifier').
    directive('llNotification', function($timeout, llNotificationTemplateUrl, llConstants) {
        /**
         * Decorator that populate the notification scope from the config object
         * passed in the argument of the service
         * @param {scope} scope the scope of the notification
         */
        function ScopeDecorator(scope) {
            this.scope = scope;
        }
        ScopeDecorator.prototype = {
            /**
             * Populate with the notification attributes
             * @return {scope} the scope of the notification
             */
            populateWith: function() {
                var notification = this.scope.notification;
                // notification.scope === scope defined in the config object
                if (typeof notification.scope === 'object') {
                    for (var key in notification.scope) {
                        this.scope[key] = notification.scope[key];
                    }
                }
                return this.scope;
            }
        };

        return {
            scope: true,
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: llNotificationTemplateUrl,
            transclude: true,
            link: function(scope) {
                var notification = scope.notification;
                notification.isShown = true;
                scope = new ScopeDecorator(scope).populateWith(scope.notification);

                /**
                 * Remove the notification from the parent scope
                 */
                var removeNotification = function removeNotification() {
                    scope.notification.isShown = false;
                    // Let some time before removing the notification from the collection
                    // because of the animation!
                    $timeout(function() {
                        scope.$parent.notifications.splice(scope.$index, 1);
                    }, llConstants.FADE_DELAY);
                };

                scope.closeNotification = removeNotification;
                notification.timeout(removeNotification);
            }
        };
    });
})();
