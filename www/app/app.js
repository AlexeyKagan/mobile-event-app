import './app.routes.js';

import './sections/login/login.js';

angular.module('mainApp', [
  'ionic',
  'app.routes',
  // 'loginCtrl',
  'signupCtrl',
  'homeCtrl',
  'taskCtrl',
  'taskService',

  // new structure
  'task.login'
]);

 