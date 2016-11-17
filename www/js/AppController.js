angular.module('app.controllers', [])
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })
  .controller('RutasCtrl', function ($scope, $stateParams) {
    $scope.myTitle = "Rutas";
  })


.controller('ConfigRutaCtrl', function ($scope, rutasWaypoints) {
    $scope.myTitle = "Seleccionar Ruta";

    $scope.rutas = rutasWaypoints.getRutas();
  })
  .controller('ConfigCtrl', function ($scope, $state, $stateParams, $cordovaGeolocation, rutasWaypoints) {
    var ruta = rutasWaypoints.getRuta($stateParams.ruta);
    $scope.myTitle = ruta.title;
    $scope.seleccionarPunto = "";
    $scope.rutas = rutasWaypoints.getRutas();
    $scope.gMarkers = {};
    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    /* 
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
     
      }, function(error){
        console.log("Could not get location");
      });
    */


    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 14
    });
    var infoWindow = new google.maps.InfoWindow({
      map: map
    });



    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };


        var flightPath = new google.maps.Polyline({
          path: ruta.puntos,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);


        infoWindow.setPosition(pos);
        infoWindow.setContent('Posición Actual.');
        map.setCenter(pos);
        map.addListener('click', function (e) {
          cambiarMarcadores(e.latLng);
          alert($scope.myTitle);
        });

      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }



    //Cambiar los dos tipos de marcadores
    function cambiarMarcadores(pos) {
      if ($scope.seleccionarPunto.length > 0) {
        agregarMarcador(pos);
      }
    }


    //Agregar marcador
    function agregarMarcador(pos) {
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        label: $scope.seleccionarPunto
      });
      if ($scope.gMarkers[$scope.seleccionarPunto]) $scope.gMarkers[$scope.seleccionarPunto].setMap(null);
      $scope.gMarkers[$scope.seleccionarPunto] = marker;
    }




    //Errores
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }



    $scope.seleccionar = function (tipo) {
      if ($scope.seleccionarPunto.length === 0) {
        $scope.seleccionarPunto = tipo;
      } else if ($scope.seleccionarPunto === tipo) {
        $scope.seleccionarPunto = "";
      } else {
        $scope.seleccionarPunto = tipo;
      }
    }




  });
