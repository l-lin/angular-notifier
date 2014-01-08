(function() {
    'use strict';
    angular.module('llNotifier', ['ngAnimate']).
    value('llNotificationsTemplateUrl', 'src/notifications.html').
    value('llNotificationTemplateUrl', 'src/notification.html').
    constant('llConstants', {
        DEFAULT_NOTIFICATION_TYPE: 'default',
        DEFAULT_NOTIFICATION_POSITION: 'top center',
        DEFAULT_DELAY: 3000, // 3 seconds,
        FADE_DELAY: 1000 // 1 second
    });
})();
