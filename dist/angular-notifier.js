/*!
 * angular-notifier - v0.0.1
 * https://github.com/l-lin/angular-notifier
 */
(function () {
  'use strict';
  angular.module('llNotifier', ['ngAnimate']).value('llNotifierTemplateUrl', 'src/angular-notifier.html').constant('llConstants', {
    DEFAULT_NOTIFICATION_TYPE: 'default',
    DEFAULT_NOTIFICATION_POSITION: 'top center',
    DEFAULT_TIMEOUT: 3000
  });
}());
(function () {
  'use strict';
  angular.module('llNotifier').factory('NotificationDecorator', function () {
    function NotificationDecorator(args) {
      this.params = args;
    }
    NotificationDecorator.prototype = {
      toObject: function () {
        var obj = this.params;
        if (typeof obj !== 'object') {
          obj = { template: obj };
        }
        return obj;
      }
    };
    return NotificationDecorator;
  }).factory('llNotificationScopeFactory', [
    '$rootScope',
    '$timeout',
    function ($rootScope, $timeout) {
      return {
        newConfiguredScope: function (notification, notificationScope) {
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
          scope.closeNotification = function () {
            scope.isShown = false;
          };
          if (notification.hasTimeout) {
            $timeout(function () {
              scope.isShown = false;
            }, notification.timeout);
          }
          return scope;
        }
      };
    }
  ]).factory('Notification', [
    '$compile',
    'llConstants',
    'NotificationDecorator',
    'llNotificationScopeFactory',
    function ($compile, llConstants, NotificationDecorator, llNotificationScopeFactory) {
      function Notification(args) {
        var notification = new NotificationDecorator(args).toObject();
        this.template = notification.template ? notification.template : '';
        this.type = notification.type ? notification.type : llConstants.DEFAULT_NOTIFICATION_TYPE;
        this.position = notification.position ? notification.position : llConstants.DEFAULT_NOTIFICATION_POSITION;
        this.hasTimeout = angular.isUndefined(notification.hasTimeout) ? true : notification.hasTimeout === true;
        this.timeout = angular.isDefined(notification.timeout) ? notification.timeout : llConstants.DEFAULT_TIMEOUT;
        this.scope = llNotificationScopeFactory.newConfiguredScope(this, angular.isDefined(notification.scope) ? notification.scope : {});
      }
      Notification.prototype = {
        render: function () {
          var template = '<ll-notification type="type" position="position" has-timeout="hasTimeout" timeout="timeout">' + this.template + '</ll-notification>', templateElement = $compile(template)(this.scope), bodyElement = angular.element(document).find('body');
          bodyElement.append(templateElement);
        }
      };
      return Notification;
    }
  ]);
}());
(function () {
  'use strict';
  angular.module('llNotifier').service('notifier', [
    'Notification',
    function (Notification) {
      this.notify = function notify(args) {
        new Notification(args).render();
      };
    }
  ]);
}());
(function () {
  'use strict';
  angular.module('llNotifier').directive('llNotification', [
    'llNotifierTemplateUrl',
    function (llNotifierTemplateUrl) {
      return {
        scope: true,
        restrict: 'E',
        templateUrl: llNotifierTemplateUrl,
        transclude: true
      };
    }
  ]);
}());
angular.module('llNotifier').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('src/angular-notifier.html', '<span class="notifier-msg {{type}} {{position}}" ng-click="closeNotification()" ng-show="isShown" ng-cloak ng-transclude>\r' + '\n' + '</span>');
  }
]);