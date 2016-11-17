angular.module('login.controllers', ['ionic','ui.router'])

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout,$state) {
    $scope.doLogin = function (user) {
        $state.go('app.rutas');
    };
})
.service('userInfo',function(){
    return{
        usuario:{},
        rutas:[],
        getUser: function(){
            return this.usuario;
        },
        updateUser: function(user){
            this.usuario = user;
        },
        getRutas: function(){
            return this.rutas;
        },
        getRuta: function(id){
            for(var i = 0; i<rutas.length; i++){
                if(i == id) return rutas[id];
            }
            return null;
        },
        updateRuta: function(id,ruta){
            for(var i = 0; i<rutas.length; i++){
                 if( rutas[i] == id) rutas[i] = ruta;
            }
        },
        addRuta: function(ruta){
            var id = rutas.length;
        }
    }
})