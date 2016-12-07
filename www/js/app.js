// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $ionicConfigProvider,$urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Each tab has its own nav history stack:

  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'DashCtrl'
  })

  .state('form', {
    url: '/form',
    templateUrl: 'templates/form.html',
    controller: 'formCtrl'
  })

  .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.list', {
    url: '/list',
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'listCtrl'
      }
    }
  })

  .state('menu.checkbox', {
    url: '/checkbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/checkbox.html',
        controller: 'checkboxCtrl'
      }
    }
  })

  .state('menu.radio', {
    url: '/radio',
    views: {
      'menuContent': {
        templateUrl: 'templates/radio.html',
        controller: 'radioCtrl'
      }
    }
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'tabsCtrl'
  })

  .state('tab.list', {
    url: '/list',
    views: {
      'list': {
        templateUrl: 'templates/list.html',
        controller: 'listCtrl'
      }
    }
  })

  .state('tab.checkbox', {
      url: '/checkbox',
      views: {
        'checkbox': {
          templateUrl: 'templates/checkbox.html',
          controller: 'checkboxCtrl'
        }
      }
    })

  .state('tab.radio', {
    url: '/radio',
    views: {
      'radio': {
        templateUrl: 'templates/radio.html',
        controller: 'radioCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash')
  $ionicConfigProvider.scrolling.jsScrolling(false);

});
