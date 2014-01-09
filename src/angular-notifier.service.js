(function() {
    'use strict';
    angular.module('llNotifier').
    service('notifier', function($http, $rootScope, $templateCache, $compile, Notification, llNotificationsTemplateUrl) {
        this.scope = $rootScope.$new();
        this.scope.notifications = [];
        this.isFirstNotification = true;

        /**
         * Fetch the template content and execute the given function
         * @param  {Function} fn the function to execute with the loaded template content
         */
        function fetchTemplateContent(fn) {
            $http.get(llNotificationsTemplateUrl, {
                cache: $templateCache
            }).
            success(function(template) {
                fn(template);
            }).
            error(function(data) {
                throw new Error('Template specified for llNotifier (' + llNotificationsTemplateUrl + ') could not be loaded. ' + data);
            });
        }

        /**
         * Append the template content in the body
         * @param {String} template the template content
         * @param {scope} scope the scope to link to the content
         */
        function appendTemplateToBody(template, scope) {
            var templateElement = $compile(template)(scope),
                bodyElement = angular.element(document).find('body');
            bodyElement.append(templateElement);
        }

        /**
         * Notify the given argument
         * @param  {JSONObject|String} args the argument to notify
         */
        this.notify = function notify(args) {
            var _this = this,
                notification = new Notification(args);
            _this.scope.notifications.push(notification);
            // Only apply for the first notification
            if (_this.isFirstNotification) {
                fetchTemplateContent(function(template) {
                    appendTemplateToBody(template, _this.scope);
                    _this.isFirstNotification = false;
                });
            }
        };
    });
})();
