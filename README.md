Angular Notifier [![Build Status](https://travis-ci.org/l-lin/angular-notifier.png?branch=master)](https://travis-ci.org/l-lin/angular-notifier) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
================
> AngularJS simple notifications service

Work still in progress!

Live demo
================
See [demo](http://l-lin.github.io/angular-notifier/)

Getting started
================
Dependencies
----------------
The only required dependencies are:
* [AngularJS](http://angularjs.org/) (tested with version 1.2.7)
* [AngularAnimate](http://docs.angularjs.org/api/ngAnimate) (tested with version 1.2.7)
No dependencies on jQuery!

Download
----------------
### Manually
The files can be downloaded from:
* Minified [JS](https://github.com/l-lin/angular-notifier/dist/angular-notifier.min.js) and [CSS](https://github.com/l-lin/angular-notifier/dist/angular-notifier.min.css) for production usage
* Un-minified [JS](https://github.com/l-lin/angular-notifier/dist/angular-notifier.js) and [CSS](https://github.com/l-lin/angular-notifier/dist/angular-notifier.css) for development

### With BowerJS
```
$ bower install angular-notifier
```

Installation
----------------
Include the JS and CSS file in your index.html file: 
```
<link rel="stylesheet" href="angular-notifier.min.css">
<script src="angular-notifier.min.js"></script>
```
Declare dependencies on your module app like this:
```
angular.module('myModule', ['llNotifier']);
```

Usage
================
Simple usage
----------------
Inject the notifier service and notify by supplying with a String as a parameter like this:

```
app.controller('demoCtrl', function($scope, notifier) {
    $scope.demoText = 'foobar';
    $scope.notify = function() {
        notifier.notify($scope.demoText);
    };
    $scope.success = function() {
        notifier.success($scope.demoText);
    };
    $scope.warning = function() {
        notifier.warning($scope.demoText);
    };
    $scope.info = function() {
        notifier.info($scope.demoText);
    };
    $scope.error = function() {
        notifier.error($scope.demoText);
    };
});
```
Custom notifications
----------------
Inject the notifier service and notify by supplying with a config Object as a parameter like this:
```
app.controller('demoCtrl', function($scope, notifier) {
    $scope.demoNotification = {
        message: 'Custom notification',
        hasTimeout: true,
        timeout: 3000,
        type: 'info',
        position: 'top center'
    };
    $scope.customNotify = function() {
        notifier.notify($scope.demoNotification);
    };
});
```
License
================
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
