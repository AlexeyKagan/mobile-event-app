import TaskView from './taskView.ctrl.js';
import TEMPLATE from './taskView.tpl.html';
// import './taskView.scss';

angular.module('task.view', [])
  .component('taskView', {
    bindings: {},
    template: TEMPLATE,
    controller: TaskView
  });



