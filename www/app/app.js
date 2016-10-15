import './app.routes.js';

// View Components
import './sections/login/login.component.js';
import './sections/signUp/signup.component.js';
import './sections/taskView/taskView.component.js'
import './sections/taskViewLists/taskViewLists.component.js';
import './sections/editTask/editTask.component.js';
import './sections/addTask/addTask.component.js';

// Ui Components
import './components/app.uiComponents.js';

import './services/taskService.js';

angular.module('mainApp', [
  'ionic',
  'app.routes',
  'app.ui.components',

  // components
  'task.login',
  'task.signUp',
  'task.view',
  'task.view.lists',
  'task.edit',
  'task.addTask',

  // services
  'taskService'
]);

 