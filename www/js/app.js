// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','login.controllers','app.controllers','RutasInfo','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

     .state('login',{
         url:"/login",
         templateUrl:"templates/login.html",
         controller: 'LoginCtrl'
     })
    .state('app',{
        url:"/app",
        templateUrl:"templates/menu.html",
        controller: 'AppCtrl'
    })
    .state('app.rutas', {
        url:"/rutas",
        views: {
          'menuContent': {
            templateUrl:"templates/rutas.html",
            controller: 'RutasCtrl'
          }
      }
    })
    .state('app.configRuta', {
        url:"/configRuta",
        views: {
          'menuContent': {
            templateUrl:"templates/seleccionarRuta.html",
            controller: 'ConfigRutaCtrl'
          }
      }
    })
    .state('app.configuration', {
        url:"/config",
        views: {
          'menuContent': {
            templateUrl:"templates/configRuta.html",
            controller: 'ConfigCtrl'
          }
      },
      params: {
    ruta: null
  }
    })
    .state('app.tomarCamion', {
        url:"/tomarCamion",
        views: {
          'menuContent': {
            templateUrl:"templates/rutas.html",
            controller: 'RutasCtrl'
          }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});