angular.module('app.controllers', [])
.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

})
.controller('RutasCtrl',function($scope,$stateParams){
    $scope.myTitle = "Rutas";
})


.controller('ConfigRutaCtrl',function($scope,rutasWaypoints){
    $scope.myTitle = "Seleccionar Ruta";

    $scope.rutas = rutasWaypoints.getRutas();
})
.controller('ConfigCtrl',function($scope,rutasWaypoints){
    $scope.myTitle = "Configurar Ruta";
    $scope.seleccionarPunto = "";
    $scope.rutas = rutasWaypoints.getRutas();

    function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });
      }
      initMap();


    $scope.seleccionar = function(tipo){
        if($scope.seleccionarPunto.length === 0){
            $scope.seleccionarPunto = tipo;
        }
        else if($scope.seleccionarPunto === tipo){
            $scope.seleccionarPunto = "";
        }
        else{
            $scope.seleccionarPunto = tipo;
        }
    }




});