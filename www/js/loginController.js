angular.module('login.controllers', ['ionic','ui.router'])

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout,$state) {
    $scope.doLogin = function (user) {
        $state.go('app.rutas');
    };
})