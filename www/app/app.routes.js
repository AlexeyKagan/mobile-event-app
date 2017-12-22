angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // TODO state metadata
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
        // abstract: true,
        template: '<task-view> </task-view>'
      })

      .state('home.calendar', {
        url: '/calendar',
        views: {
          'menuContent': {
            template: '<task-calendar />'
          }
        }
      })

      .state('home.contacts', {
        url: '/contacts',
        views: {
          'menuContent': {
            template: '<contacts />'
          }
        }
      })

      .state('home.addTask', {
        url: '/addTask',
        views: {
          'menuContent': {
            template: '<add-task />'
          }
        }
      })

      .state('home.taskForCurrentDate', {
        url: '/task/:date',
        views: {
          'menuContent': {
            template: '<task-view-lists> </task-view-lists>'
          }
        },
        // cache: false
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

    // Disabled views cache
    $ionicConfigProvider.views.maxCache(0);
    // Disabled animations
    $ionicConfigProvider.views.transition('android');

  });
