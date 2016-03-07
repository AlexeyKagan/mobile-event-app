

angular.module('taskService', [])
  .factory('taskFactory',[ function(){  //factory for angular
       var taskFactory = {};

       taskFactory.all = () => {
          var tasks = window.localStorage['tasks'];
          if (tasks) {
            return angular.fromJson(tasks);
          }
          return [];
        };

       taskFactory.save = (task) => {
          window.localStorage['tasks'] = angular.toJson(task);
       };

       taskFactory.aboutTaskId = (id) => {
         var all = taskFactory.all();

         for (var i=0;i<all.length;i++){
           if (all[i].id == id) return all[i];
         }

         return [];

       };

    taskFactory.weather = () => {

    };

    return taskFactory;

  }]);
