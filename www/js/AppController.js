angular.module('app.controllers', [])
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })
  .controller('RutasCtrl', function ($scope, $stateParams, $rootScope, userInfo) {
    $scope.myTitle = "Rutas";
    $scope.rutasConfigs = userInfo.getRutas();
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        if (toState.name === 'app.rutas') {
          $scope.rutasConfigs = userInfo.getRutas();
          console.log($scope.rutasConfigs[0]);
        }
      });

    console.log($scope.rutasConfigs[0]);
  })


.controller('ConfigRutaCtrl', function ($scope, rutasWaypoints, userInfo) {
    $scope.myTitle = "Seleccionar Ruta";

    $scope.rutas = rutasWaypoints.getRutas();



  })
  .controller('ConfigCtrl', function ($scope, $state, $stateParams, $cordovaGeolocation, $ionicPopup,$timeout, rutasWaypoints, userInfo) {
    var ruta = rutasWaypoints.getRuta($stateParams.ruta);

    $scope.myTitle = ruta.title;
    $scope.seleccionarPunto = "";
    $scope.rutas = rutasWaypoints.getRutas();
    $scope.ruta = {
      puntos: {},
      rutaId: ruta.title
    };
    $scope.gMarkers = {};
    $scope.pos = 0;


    var lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: '#393'
    };


    //Iniciamos si ya hay valores guardados
    if ($stateParams.id) {
      $scope.ruta = userInfo.getRuta($stateParams.id).ruta;
      $scope.seleccionarPunto = 'Origen';
      $scope.agregarMarcador($scope.ruta.puntos['Origen']);
      $scope.seleccionarPunto = 'Destino';
      $scope.agregarMarcador($scope.ruta.puntos['Destino']);
    }

    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };


    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


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
    directionsDisplay.setMap(map);



    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        $scope.pos = pos;

        var flightPath = new google.maps.Polyline({
          path: ruta.puntos,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 5,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
        });



        flightPath.setMap(map);

        animateCircle(flightPath);

        flightPath.addListener('click', function (e) {
          cambiarMarcadores(e.latLng);
        });

        infoWindow.setPosition(pos);
        infoWindow.setContent('Posición Actual.');
        map.setCenter(pos);


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
        draggable: false,
        animation: google.maps.Animation.DROP,
        label: $scope.seleccionarPunto
      });

      if ($scope.gMarkers[$scope.seleccionarPunto]) {
        $scope.gMarkers[$scope.seleccionarPunto].setMap(null);
      }
      $scope.gMarkers[$scope.seleccionarPunto] = marker;
      $scope.ruta.puntos[$scope.seleccionarPunto] = marker.position;

      if ($scope.seleccionarPunto === 'Origen') {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }
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

    $scope.guardarRuta = function (ruta) {
      userInfo.addRuta(ruta);
      var alertPopup = $ionicPopup.alert({
        title: "Terminado",
        template: "Se a guardado con exito",
        okText: "OK",
        okType: "button-balanced"
      });
      $timeout(function(){
        var alertPopup = $ionicPopup.alert({
        title: "Camión Llegando",
        template: "Tu Camión llega en 5 minutos",
        okText: "OK",
        okType: "button-balanced"
      });
      },10000)
      $state.go('app.rutas');
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      directionsService.route({
        origin: $scope.pos,
        destination: $scope.ruta.puntos['Origen'],
        travelMode: google.maps.TravelMode.WALKING
      }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }


    function animateCircle(line) {
      var count = 1000;
      window.setInterval(function () {
        count = (count + 1) % 2000;

        var icons = line.get('icons');
        icons[0].offset = (count / 40) + '%';
        line.set('icons', icons);
      }, 300);
    }

  });
