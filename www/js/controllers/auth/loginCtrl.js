
angular.module('loginCtrl', [])
.controller('loginController',['$location',function($location){
    var vm = this;

    vm.a = 'Hey';
    vm.somefunc = function() {
      console.log('asd');
      $location.path('/home/task');
    }

  }]);
