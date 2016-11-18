angular.module('login.controllers', ['ionic','ui.router'])

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout,$state,userInfo) {
    $scope.doLogin = function (user) {
        userInfo.updateUser(user);
        alert(user.usuario);
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
            for(var i = 0; i<this.rutas.length; i++){
                if(this.rutas[i].id == id ) return this.rutas[id];
            }
            return null;
        },
        updateRuta: function(id,ruta){
            for(var i = 0; i<this.rutas.length; i++){
                 if(this.rutas[i].id == id) this.rutas[i].ruta = ruta;
            }
        },
        addRuta: function(rutaInfo){
            var no = this.rutas.length;
            var ruta = {
                id: no,
                ruta: rutaInfo
            }
            this.rutas.push(ruta);
            console.log(this.rutas[0]);
            console.log("Registrado");
            return no;
        }
    }
})