(function() {
    'use strict';
    angular.module('llNotifier').
    service('notifier', function(Notification) {
        /**
         * Notify the given argument
         * @param  {JSONObject|String} args the argument to notify
         */
        this.notify = function notify(args) {
            new Notification(args).render();
        };
    });
})();
