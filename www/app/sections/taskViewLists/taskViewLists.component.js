import TaskViewLists from './taskViewLists.ctrl.js';
import TEMPLATE from './taskViewLists.tpl.html';
// import './taskViewLists.scss';

angular.module('task.view.lists', [])
  .component('taskViewLists', {
    bindings: {},
    template: TEMPLATE,
    controller: TaskViewLists,
    controllerAs: 'task'
  }); 



