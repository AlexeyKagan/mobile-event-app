import './app.routes.js';


// Components
import './sections/login/login.component.js';
import './sections/signUp/signup.component.js';
import './sections/taskView/taskView.component.js'
import './sections/taskViewLists/taskViewLists.component.js';
import './sections/editTask/editTask.component.js';
import './sections/addTask/addTask.component.js';

angular.module('mainApp', [
  'ionic',
  'app.routes',
  // 'loginCtrl',
  // 'signupCtrl',
  // 'homeCtrl',
  'taskCtrl',
  'taskService',

  // components
  'task.login',
  'task.signUp',
  'task.view',
  'task.view.lists',
  'task.edit',
  'task.addTask'
]);

 