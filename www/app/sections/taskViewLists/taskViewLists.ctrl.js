// TODO module directory 'core'
import { monthName, dayName } from '../../../core/date.utils.js';
import * as TasksActions from 'actions/tasks.actions.js';

export default class TaskViewLists {

  constructor($scope, $http, $state, $ngRedux) {

    Object.assign(this, { $http, $state });
    this.$scope = $scope;
    $scope.$ctrl = this;


    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);

  }

  getDateByParam() {

    if (!this.$state.params.date) {
      return new Date();
    }

    return new Date(...this.$state.params.date.split('.'))
  }

  compareDates(date, date1) {

  }

  mapStateToThis({ tasks = {}, visibilityFilter }) {

    return {
      state: tasks,
      tasks: this.$state.params.date && this.getFiltered(tasks.tasks.filter(t => new Date(t.dateAt).toString() === this.getDateByParam().toString()), visibilityFilter),
      filter: visibilityFilter
    }
  }

  getFiltered(tasks, text) {
    if (!text) { return tasks; }

    return tasks.filter(d => d.title.includes(text));
  }

  $onInit() {

    this.getWeather();
    this.setCurrentDateTime();
    console.log('taskViewListInit', this.tasks);
    if (this.tasks && !this.tasks.length) {
      this.fetchTasks();
    }

  }

  $onDestroy() {
    console.warn('$onDestroy');
    this.unsubscribe();
  }

  getTasks() {

    return this.tasks;
  }

  setCurrentDateTime() {

    const date = this.getDateByParam();

    const dateTime = {
      day: dayName(date.getDay()),
      dateNow: date.getDate(),
      monthNow: monthName(date.getMonth()),
      yearNow: date.getFullYear()
    };

    this.update(dateTime);
  }

  getWeather() {
    console.log('getWeather');
    // TODO Delete it from here.
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=6b19232ef146adecb4a1f928c4c9812a")
        .then(res => {
          console.log('api.openweathermap', res);
          const icon = res.data.weather[0].icon;
          const temp = Math.round(res.data.main.temp - 275) + " °C";
          const img = document.querySelector("#img-weather");

          angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png');

          this.update({ temp });
          console.log('api.openweathermap', this);
        }, function errorCallback(res) {
          console.log(res);
        });

    }, function (error) {
      console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }, { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
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

    this.$state.go('home.edit', { id, date: this.$state.params.date })
  }

}


