import TasksActions from 'actions/tasks.actions.js';

export default class EditTask {

  constructor($state, $ngRedux) {

    Object.assign(this, { $state });

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);
  }

  mapStateToThis(state = []) {
    return {
      task: state.tasks.find(t => t.id === this.$state.params.id)
    }
  }


  $onInit() {

    // this.task = this.taskFactory.aboutTaskId(this.$state.params.id);
  }

  $onDestroy() {

    this.unsubscribe();
  }

  deleteTask() {

    this.removeTask(this.task.id);

    this.$state.go('home.task');
  }


}


