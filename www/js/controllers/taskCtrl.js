angular.module('taskCtrl', [])
  .controller('taskController', ['$location', 'taskFactory', '$timeout', '$rootScope', '$scope', '$stateParams', '$http',
    function ($location, taskFactory, $timeout, $rootScope, $scope, $stateParams, $http) {

      var vm = this;

      //##########
      //## weather and day(day now) || WEATHER API
      //##########
      var date = new Date();
      var location = "http://ip-api.com/json";

      vm.temp = 0;

      $http.get(location).then(function successCallback(res) {

        var lat = res.data.lat;
        var lon = res.data.lon;


        $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=44db6a862fba0b067b1930da0d769e98")
          .then(function successCallback(res) {

            var icon = res.data.weather[0].icon;

            vm.temp = Math.round(res.data.main.temp - 273.15) + " °C";
            var img = document.querySelector("#img-weather");

            console.log(angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png'));


          }, function errorCallback(res) {
            console.log(res);
          });


      }, function errorCallback(res) {
        console.log('error : ' + res);
      });

      vm.getDay = dayName(date.getDay());
      vm.dateNow = date.getDate();
      vm.monthNow = monthName(date.getMonth());
      vm.yearNow = date.getFullYear();


      // ##########
      // add task
      // #########
      vm.addTask = () => {
        var all = taskFactory.all();
        var length = all.length;
        var date = new Date(vm.time);

        if (vm.title == null || vm.description == null) return false;

        function dateFilt(data) { //### FUNCTION FOR FILTER TIMEAT

          if (date.getHours()) { //if date is not NAN then return date
            if (date.getHours() < 10) //if hourse<10 add 0 before hourse. will look like : 09:13;
              return "0" + date.getHours() + ":" + date.getMinutes();
            else
              return date.getHours() + ":" + date.getMinutes()
          }

          else return "";
        }


        var x = {
          id: length++, // increment id
          title: vm.title,
          description: vm.description,
          //timeAt:new Date(vm.time).getHours()<10 ? "asd" : 1 +":" + new Date(vm.time).getMinutes(),
          //timeAt: date.getHours() ? date.getHours() + ":" + date.getMinutes() : "", //if date is NaN return empty
          timeAt: dateFilt(date),


          dateAt: new Date(vm.date)
        };

        vm.tasks.push(x);
        taskFactory.save(vm.tasks);
        $location.path('/home/task');
      };

      //get all tasks from localstorage
      vm.tasks = taskFactory.all();

      //watch our localstorage for changes
      $scope.$watch(function () {
        return window.localStorage['tasks'];
      }, function (newData, oldData) {
        vm.tasks = taskFactory.all();
      });


      //##########
      //## about our task
      //##########

      vm.aboutTaskId = taskFactory.aboutTaskId($stateParams.id);

      vm.aboutTask = (id) => {
        vm.aboutTaskId = taskFactory.aboutTaskId(id);
        $location.path('/home/about/' + id);

      };

      vm.DeleteTaskId = (id) => {
        taskFactory.deleteId(id);
        console.log(id);
        $location.path('/home/task')
      }


    }])

  .filter('timeFilter', function () {

    return function (data) {

      return data
    }

  })


  .directive('ngMenuDir', [function () {
    return {
      //scope:{},
      //restrict : 'A',
      link: function (scope, element, attrs) {
        element.on('click', function (e) {
          element.toggleClass('active');
        })
      }
    }
  }])
  .directive('ngDeleteTask', [function(){

  }]);

console.log('taskCtrl');


//function for get name of day and month

function monthName(number) {

  switch (number) {
    case 0 :
      return "Январь";
      break;
    case 1 :
      return "Февраль";
      break;
    case 2 :
      return "Март";
      break;
    case 3 :
      return "Апрель";
      break;
    case 4 :
      return "Май";
      break;
    case 5 :
      return "Июнь";
      break;
    case 6 :
      return "Июль";
      break;
    case 7 :
      return "Август";
      break;
    case 8 :
      return "Сентябрь";
      break;
    case 9 :
      return "Октебярь";
      break;
    case 10 :
      return "Ноябрь";
      break;
    case 11 :
      return "Декабрь";
      break;
  }
}

function dayName(number) {

  switch (number) {
    case 0 :
      return "Воскресенье";
      break;
    case 1 :
      return "Понедельник";
      break;
    case 2 :
      return "Вторник";
      break;
    case 3 :
      return "Среда";
      break;
    case 4 :
      return "Четверг";
      break;
    case 5 :
      return "Пятница";
      break;
    case 6 :
      return "Суббота";
      break;
  }
}


