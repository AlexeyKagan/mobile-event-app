

angular.module('homeCtrl', [])
  .controller('homeController',['$ionicSideMenuDelegate',function($ionicSideMenuDelegate){

    var vm = this;
    //slide menu
    vm.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft();
    };

    vm.exit = ()=>{
      ionic.Platform.exitApp();
    }



  }]);


