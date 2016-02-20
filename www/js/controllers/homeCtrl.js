

angular.module('homeCtrl', [])
  .controller('homeController',['$ionicSideMenuDelegate',function($ionicSideMenuDelegate){

    var vm = this;
    vm.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft();
    }

  }]);

