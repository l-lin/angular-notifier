(function() {
    'use strict';
    angular.module('llNotifier').directive('llNotification', function(llNotifierTemplateUrl) {
        // Runs during compile
        return {
            scope: true,
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: llNotifierTemplateUrl,
            transclude: true
        };
    });
})();
