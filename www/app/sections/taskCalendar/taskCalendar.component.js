import TaskCalendar from './taskCalendar.ctrl.js';
import TEMPLATE from './taskCalendar.tpl.html';

angular.module('task.calendar', [])
  .component('taskCalendar', {
    bindings: {},
    template: TEMPLATE,
    controller: TaskCalendar
  });

