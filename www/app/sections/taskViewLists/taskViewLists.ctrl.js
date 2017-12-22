import { monthName, dayName } from '../../../core/date.utils.js';
import * as TasksActions from 'actions/tasks.actions.js';
import { currentTasks, getWeather } from './utils';

export default class TaskViewLists {

  constructor($scope, $http, $state, $ngRedux) {

    Object.assign(this, {$http, $state});

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

  mapStateToThis({tasks = {}, visibilityFilter}) {
    const tasks = currentTasks(tasks, this.$state.params.date);
    const filteredTasks = this.getFiltered(tasks, visibilityFilter);

    return {
      tasks: filteredTasks,
      filter: visibilityFilter
    }
  }

  getFiltered(tasks, text) {
    if (!text) {
      return tasks;
    }

    return tasks.filter(task => task.title.includes(text));
  }

  $onInit() {

    this.getWeather();
    this.setCurrentDateTime();

    if (this.tasks && !this.tasks.length) {
      this.fetchTasks();
    }

  }

  $onDestroy() {
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
    getWeather(this.$http).then(res => {
      //@TODO rewrite this logic below
      const icon = res.data.weather[0].icon;
      const temp = Math.round(res.data.main.temp - 275) + " °C";
      const img = document.querySelector("#img-weather");

      angular.element(img).attr("src", "http://openweathermap.org/img/w/" + icon + '.png');

      this.update({ temp });
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

    this.$state.go('home.edit', {id, date: this.$state.params.date})
  }

}


