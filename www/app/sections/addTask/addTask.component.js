import AddTask from './addTask.ctrl.js';
import TEMPLATE from './addTask.tpl.html';
// import './addTask.scss';

angular.module('task.addTask', [])
  .component('addTask', {
    bindings: {},
    template: TEMPLATE,
    controller: AddTask
  }); 



