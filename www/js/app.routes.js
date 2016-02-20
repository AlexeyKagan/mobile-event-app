
angular.module('app.routes', [])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/auth/login.html',
        controller : 'loginController',
        controllerAs : 'login'
      })

      .state('signup', {
        url: '/signup',
        templateUrl : 'templates/auth/signup.html',
        controller: 'signupController',
        controllerAs : 'signup'
      })

      .state('home', {
        url:'/home',
        templateUrl : 'templates/home.html',
        controller: 'homeController',
        controllerAs: 'home'
      })

      .state('home.addTask', {
        url:'/addTask',
        views: {
          'menuContent': {
            templateUrl: 'templates/addTask.html'
          }
        }
      })

      .state('home.task', {
        url: '/task',
        views: {
          'menuContent':{
            templateUrl: 'templates/task.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');

  });
