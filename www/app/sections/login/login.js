import './login.ctrl.js';
import TEMPLATE from './login.tpl.html';

function dd($location) {
	const vm = this;

    console.warn('loginController2', $location);

    vm.a = 'Hey';

    this.hello = 'Hello asddddddd';

    vm.signIn = function () {
      console.log('asd');
      $location.path('/home/task');
    }
}


angular.module('task.login', [
  // 'login.ctrl'
])
.component('taskLogin', {
  template: TEMPLATE,
  // controllerAs: 'loginController as login',
  controller: dd,
  bindings: {}
});

console.warn('angular2', angular);


  