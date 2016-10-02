
// angular.module('login.ctrl', [])
//   .controller('loginController', ['$location', function ($location) {
//     var vm = this;
//     console.warn('loginController2');
//     vm.a = 'Hey';
//     vm.signIn = function () {
//       console.log('asd');
//       $location.path('/home/task');
//     }

//   }]);

angular.module('login.ctrl', [])
  .controller('loginController', ['$location', function ($location) {
    var vm = this;
    console.warn('loginController2');
    vm.a = 'Hey';
    this.hello = 'Hello asddddddd';
    vm.signIn = function () {
      console.log('asd');
      $location.path('/home/task');
    }

  }]);

