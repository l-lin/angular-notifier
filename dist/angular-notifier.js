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
  angular.module('llNotifier').factory('notifierFactory', [
    '$timeout',
    '$rootScope',
    '$compile',
    '$http',
    '$templateCache',
    'llNotifierTemplateUrl',
    'llConstants',
    function ($timeout, $rootScope, $compile, $http, $templateCache, llNotifierTemplateUrl, llConstants) {
      function fetchTemplateContent(templateUrl) {
        return $http.get(templateUrl, { cache: $templateCache });
      }
      function createScopeAndConfigure(notification) {
        var scope = $rootScope.$new();
        scope.message = notification.message;
        scope.isShown = true;
        if (typeof notification.scope === 'object') {
          for (var key in notification.scope) {
            scope[key] = notification.scope[key];
          }
        }
        scope.closeMsg = function () {
          scope.isShown = false;
        };
        if (notification.hasTimeout) {
          $timeout(function () {
            scope.isShown = false;
          }, notification.timeout);
        }
        return scope;
      }
      function createTemplateElement(template, scope) {
        return $compile(template)(scope);
      }
      return {
        newNotification: function (args) {
          var notification = args;
          if (typeof notification !== 'object') {
            notification = { message: notification };
          }
          notification.templateUrl = notification.templateUrl ? notification.templateUrl : llNotifierTemplateUrl;
          notification.scope = angular.isUndefined(args.scope) ? {} : args.scope;
          notification.type = notification.type ? notification.type : llConstants.DEFAULT_NOTIFICATION_TYPE;
          notification.position = notification.position ? notification.position : llConstants.DEFAULT_NOTIFICATION_POSITION;
          if (angular.isUndefined(args.hasTimeout)) {
            notification.hasTimeout = true;
          }
          if (angular.isUndefined(args.timeout)) {
            notification.timeout = llConstants.DEFAULT_TIMEOUT;
          }
          notification.render = function () {
            var _this = this;
            fetchTemplateContent(_this.templateUrl).success(function (template) {
              var scope = createScopeAndConfigure(notification), templateElement = createTemplateElement(template, scope), bodyElement = angular.element(document).find('body');
              templateElement.addClass(_this.type);
              templateElement.addClass(_this.position);
              bodyElement.append(templateElement);
            }).error(function (data) {
              throw new Error('Template specified for llNotifier (' + notification.template + ') could not be loaded. ' + data);
            });
          };
          return notification;
        }
      };
    }
  ]);
}());
(function () {
  'use strict';
  angular.module('llNotifier').service('notifier', [
    'notifierFactory',
    function (notifierFactory) {
      var doNotify = function doNotify(args, notificationType) {
        var notification = notifierFactory.newNotification(args);
        if (angular.isDefined(notificationType)) {
          notification.type = notificationType;
        }
        notification.render();
      };
      this.notify = function notify(args) {
        doNotify(args);
      };
      this.success = function success(args) {
        doNotify(args, 'success');
      };
      this.warning = function warning(args) {
        doNotify(args, 'warning');
      };
      this.info = function info(args) {
        doNotify(args, 'info');
      };
      this.error = function error(args) {
        doNotify(args, 'error');
      };
    }
  ]);
}());
angular.module('llNotifier').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('src/angular-notifier.html', '<span class="notifier-msg" ng-cloak ng-click="closeMsg()" ng-show="isShown">\r' + '\n' + '\t{{ message }}\r' + '\n' + '</span>');
  }
]);