
export default class TaskViewLists {

  constructor($scope, $http, taskFactory, $state) {

    Object.assign(this, { $scope, $http, taskFactory, $state });

  }

  $onInit() {

    this.getWeather();
    this.setCurrentDateTime();

    this.update({ tasks: this.taskFactory.all() });

  }

  setCurrentDateTime() {

    const date = new Date();

    const dateTime = {
      day: dayName(date.getDay()),
      dateNow: date.getDate(),
      monthNow: monthName(date.getMonth()),
      yearNow: date.getFullYear()
    };

    this.update(dateTime);
  }

  getWeather() {

    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      //##### USE WEATHER API FOR GET CURRENT WEATHER
      this.$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6b19232ef146adecb4a1f928c4c9812a")
        .then((res) => {

          const icon = res.data.weather[0].icon;
          const temp = Math.round(res.data.main.temp - 275) + " °C";
          const img = document.querySelector("#img-weather");

          angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png');

          this.update({ temp });

        }, function errorCallback(res) {
          console.log(res);
        });

    }, function (error) {
      console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    });
  }

  toUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  /**
   * Simple Update method.
   * Bind value to this.
   * Create getter for this value.
   * @example
   * this.update({ foo: 5 });
   * this.getFoo() => 5;
   * this.foo => 5
   * @template
   * getFoo() => 5
   *
   * @param {object} value
   */
  update(value) {

    Object.assign(this, value);

    Object.keys(value).map(v => {

      const gValue = `get${this.toUpperCase(v)}`;

      this.$scope[gValue] = () => value[v];
      this[gValue] = () => value[v];
    });
  }


  aboutTask(id) {
    console.log('aboutTask', id, this.$state);
    // vm.aboutTaskId = taskFactory.aboutTaskId(id);
    // $location.path('/home/about/' + id);
    // this.$state.go(`task/edit/${id}`)
    this.$state.go('home.edit', { id })
  }
  
}


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


