angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        template: '<task-login> </task-login>'
      })

      .state('signup', {
        url: '/signup',
        template: '<sign-up> </sign-up>'
      })

      .state('home', {
        url: '/home',
        template: '<task-view> </task-view>'
      })

      .state('home.addTask', {
        url: '/addTask',
        views: {
          'menuContent': {
            template: '<add-task />'
          }
        }
      })

      .state('home.task', {
        url: '/task',
        views: {
          'menuContent': {
            template: '<task-view-lists> </task-view-lists>'
          }
        }
      })

      .state('home.edit', {
        url: '/edit/:id',
        views: {
          'menuContent': {
            template: '<task-edit />'
          }
        }
      });

    $urlRouterProvider.otherwise('/login');

  });
