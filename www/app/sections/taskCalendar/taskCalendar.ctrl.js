import * as TasksActions from 'actions/tasks.actions.js';
import { MONTH_NAME_RU, DAY_PREFFIX_NAME_RU, getLocalDate } from 'core/date.utils.js';

export default class TaskCalendar {

  constructor($ngRedux, $scope, $state) {

    this.highlights = [];
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);


    this.fetchTasks();


    const months = Object.keys(MONTH_NAME_RU).map(k => MONTH_NAME_RU[k]);
    const daysOfTheWeek = Object.keys(DAY_PREFFIX_NAME_RU).map(k => DAY_PREFFIX_NAME_RU[k]);

    this.onezoneDatepicker = {
      date: new Date(), // MANDATORY
      mondayFirst: true,
      months,
      daysOfTheWeek,
      disablePastDays: false,
      disableSwipe: false,
      showDatepicker: true,
      showTodayButton: false,
      calendarMode: true,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: this.highlights,
      callback: value => {

        $state.go(`home.taskForCurrentDate`, { date: getLocalDate(value) })
      }

    };

  }

  mapStateToThis({ tasks: { tasks = []}}) {

    const dateForHighlight = tasks.map(t => t.dateAt && ( { date: new Date(t.dateAt) })).filter(t => t);

    this.highlights.push(...dateForHighlight);

    return {}
  }

  $onDestroy() {
    this.unsubscribe();
  }

}

TaskCalendar.$inject = ['$ngRedux', '$scope', '$state'];

