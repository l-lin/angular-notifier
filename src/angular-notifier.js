(function() {
    'use strict';
    angular.module('llNotifier', ['ngAnimate']).
    value('llNotifierTemplateUrl', 'src/angular-notifier.html').
    constant('llConstants', {
        DEFAULT_NOTIFICATION_TYPE: 'default',
        DEFAULT_NOTIFICATION_POSITION: 'top center',
        DEFAULT_TIMEOUT: 3000 // 3 seconds
    });
})();
