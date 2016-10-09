import Login from './login.ctrl.js';
import TEMPLATE from './login.tpl.html';
// import './login.scss';

angular.module('task.login', [])
.component('taskLogin', {
  bindings: {},
  template: TEMPLATE,
  controller: Login
});



  