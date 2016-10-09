
export default class EditTask {

  constructor($state, taskFactory) {

    Object.assign(this, { $state, taskFactory });

    console.log('EditTask', $state.params.id);
    console.log('EditTask2', window.location);
  }

  $onInit() {

    this.task = this.taskFactory.aboutTaskId(this.$state.params.id);
  }

  deleteTask() {

    this.taskFactory.deleteId(this.task.id);

    this.$state.go('home.task');
  }

}

