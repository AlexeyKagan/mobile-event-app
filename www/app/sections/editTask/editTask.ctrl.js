import * as TasksActions from 'actions/tasks.actions.js';
import { uuid } from 'core/utils.js';
import { getLocalDate, notifyDay } from 'core/date.utils.js';

export default class EditTask {

  constructor($state, $ngRedux, toaster) {

    Object.assign(this, { $state, toaster });

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);

  }

  mapStateToThis({ tasks: { tasks = [] } }) {

    const task0 = tasks.find(t => t.id === this.$state.params.id);

    console.log('task0', task0);

    if (!task0) { return {}; }

    const [hour, min] = (task0.timeAt || '').split(':');

    return {
      task: {
        ...task0,
        dateAt: new Date(task0.dateAt),
        timeAt: new Date(1970, 0, 1, hour, min, 0)
      }
    }
  }

  showWarningToasty(text) {
    this.flipInY = false;
    this.isNotCorrectInput = true;

    this.toaster.pop({
      type: 'warning',
      body: text,
      timeout: 3000
    });

    // this.$timeout(() => (this.isNotCorrectInput = false ), 500);

  }

  $onDestroy() {

    this.unsubscribe();
  }

  updateTask() {

    const vm = this;
    const time = new Date(this.task.timeAt);

    if (!vm.task.title || !vm.task.description) {

      this.showWarningToasty(`Введите ${vm.title ? 'описание' : 'заголовок' } задачи`);

      return;
    }

    if (notifyDay(new Date(vm.task.dateAt), this.stringifyTime(time), this.notifyOf) < new Date()) {

      this.showWarningToasty(`Дата, которую Вы задали, не может быть применена`);

      return;
    }

    const task = {
      id: uuid(),
      title: vm.task.title,
      description: vm.task.description,
      timeAt: this.stringifyTime(time),
      dateAt: new Date(vm.task.dateAt).toString(),

      dateAtServer: vm.task.dateAt && `${vm.task.dateAt.getDate()}/${vm.task.dateAt.getMonth()}/${vm.task.dateAt.getFullYear()}`
    };

    console.warn('updateTask', task);

    this.deleteTask(this.task.id);
    this.saveTask(task);

    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate(vm.dateAt) });
  }

  removeTask() {

    this.deleteTask(this.task.id);

    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate(this.task.dateAt) })
  }

  // TODO Rewrite this trash.
  stringifyTime(time) {

    let hours;
    let min;

    if (!time.getHours()) return "";

    //if hourse<10 add 0 before hourse. will look like : 09:13;
    if (time.getHours() < 10) {

      hours = "0" + time.getHours();
    } else {

      hours = time.getHours();
    }

    if (time.getMinutes() < 10) {

      min = "0" + time.getMinutes();
    } else {

      min = time.getMinutes();
    }

    return hours + ":" + min;
  }


}


