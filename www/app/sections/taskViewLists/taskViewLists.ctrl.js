import { monthName, dayName } from '../../../core/date.utils.js';
import * as TasksActions from 'actions/tasks.actions.js';

export default class TaskViewLists {

  constructor($scope, $http, $state, $ngRedux) {

    Object.assign(this, { $http, $state });
    this.$scope = $scope;
    $scope.$ctrl = this;

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, TasksActions)(this);
  }

  mapStateToThis({ tasks = {} }) {
    
    console.log('mapStateToThis', tasks);

    return {
      state: tasks,
      tasks: tasks.tasks
    }
  }

  $onInit() {

    this.getWeather();
    this.setCurrentDateTime();

    this.fetchTasks();

  }

  $onDestroy() {
    // this.unsubscribe();
    this.unsubscribe2();
  }

  getTasks() {

    return this.tasks;
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

    // TODO Delete it from here.
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6b19232ef146adecb4a1f928c4c9812a")
        .then(res => {

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
   * Simple Update method. Bind value to this. Create getter for this value.
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

    this.$state.go('home.edit', { id })
  }

}


