import { uuid } from 'core/utils.js';
import * as TasksActions from 'actions/tasks.actions.js';

export default class AddTask {

  constructor($state, $ngRedux) {

    Object.assign(this, { $state });

    this.unsubscribe = $ngRedux.connect(null, TasksActions)(this);
  }

  $onInit() {  }

  $onDestroy() {
    this.unsubscribe();
  }

  submitTask() {

    const vm = this;
    const time = new Date(vm.time);

    if (!vm.title || !vm.description) {

      return false;
    }

    const task = {
      id: uuid(),
      title: vm.title,
      description: vm.description,
      timeAt: this.stringifyTime(time),
      dateAt: new Date(vm.date)
    };

    this.saveTask(task);

    this.$state.go('home.task');
  }
  
  // TODO Rewrite this. shitty logic
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

