angular.module('taskCtrl', [])
  .controller('taskController', ['$location', 'taskFactory', '$timeout', '$rootScope', '$scope', '$stateParams', '$http',
    function ($location, taskFactory, $timeout, $rootScope, $scope, $stateParams, $http) {

      var vm = this;

      //##########
      //## weather and day(day now) || WEATHER API
      //##########
      vm.log = 'nothing';
      var date = new Date();
      vm.temp = 0;
      //###### USE CORDOVA API FOR GET LAT and LON coordoinats
      navigator.geolocation.getCurrentPosition(function (position) {

        console.log('vmlog',vm.log);
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log('lat : ' + lat);
        console.log('lon : ' + lon);
        vm.log = position.coords.latitude;
        //##### USE WEATHER API FOR GET CURRENT WEATHER
        $http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6b19232ef146adecb4a1f928c4c9812a")
          .then(function successCallback(res) {

            console.log(res);

            var icon = res.data.weather[0].icon;

            vm.temp = Math.round(res.data.main.temp - 275) + " °C";

            var img = document.querySelector("#img-weather");
            //set weather img in img tag with id #img-weather
            angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png');

          }, function errorCallback(res) {
            console.log(res);
          });

      }, function (error) {
        console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
        vm.log = error;
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
          var hours;
          var min;

          if (!date.getHours()) return ""; //if date is not NAN then return date

          if (date.getHours() < 10)
            hours = "0" + date.getHours(); //if hourse<10 add 0 before hourse. will look like : 09:13;

          else
            hours = date.getHours();

          if (date.getMinutes() < 10)
            min = "0" + date.getMinutes();
          else
            min = date.getMinutes();

          return hours + ":" + min;
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

      $scope.$watchCollection(function () {
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
  .directive('ngDeleteTask', [function () {

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
      return "Октябрь";
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


