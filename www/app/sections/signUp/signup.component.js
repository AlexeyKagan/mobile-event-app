import SignUp from './signup.ctrl.js';
import TEMPLATE from './signup.tpl.html';
// import './signup.scss';

angular.module('task.signUp', [])
  .component('signUp', {
    bindings: {},
    template: TEMPLATE,
    controller: SignUp
  });  



  