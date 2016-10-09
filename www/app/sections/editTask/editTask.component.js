import EditTask from './editTask.ctrl.js';
import TEMPLATE from './editTask.tpl.html';
// import './editTask.scss';

angular.module('task.edit', [])
  .component('taskEdit', {
    bindings: {},
    template: TEMPLATE,
    controller: EditTask
  });



