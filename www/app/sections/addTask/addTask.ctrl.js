import { uuid } from '../../../core/utils.js';

export default class AddTask {

  constructor($state, taskFactory) {

    Object.assign(this, {$state, taskFactory });
    
  }

  $onInit() {  }

  addTask() {
    const vm = this;

    const tasks = this.taskFactory.all() || [];
    const time = new Date(vm.time);

    if (!vm.title || !vm.description) {

      return false;
    }

    var task = {
      id: uuid(),
      title: vm.title,
      description: vm.description,
      timeAt: this.stringifyTime(time),
      dateAt: new Date(vm.date)
    };

    tasks.push(task);

    this.taskFactory.save(tasks);

    this.$state.go('home.task');
  }

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

