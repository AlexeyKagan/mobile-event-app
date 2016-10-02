angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        // sticky: true
        // views: {
        //   // template: '<div> <task-login /> </div>',
        //   '': { template: '<div> HEY <task-login /> </div>' }
        // }
        template: '<task-login> </task-login>',
        // component: 'taskLogin' 

        // templateUrl: 'templates/auth/login.html',
        // controller: 'loginController',
        // controllerAs: 'login'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/auth/signup.html',
        controller: 'signupController',
        controllerAs: 'signup'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        controllerAs: 'home'
      }) 

      .state('home.addTask', {
        url: '/addTask',
        views: {
          'menuContent': {
            templateUrl: 'templates/addTask.html',
            controller: 'taskController',
            controllerAs: 'task'
          }
        }
      })

      .state('home.task', {
        url: '/task',
        views: {
          'menuContent': {
            templateUrl: 'templates/task.html',
            controller: 'taskController',
            controllerAs: 'task'
          }
        }
      })

      .state('home.aboutTask', {
        url: '/about/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/aboutTask.html',
            controller: 'taskController',
            controllerAs: 'task'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');

  });
