import * as TasksActions from 'actions/tasks.actions.js';

export default class EditTask {

  constructor($state, $ngRedux) {

    Object.assign(this, { $state });

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);
  }

  mapStateToThis({ tasks: { tasks = [] } }) {

    return {
      task: tasks.find(t => t.id === this.$state.params.id)
    }
  }


  $onInit() {

    // this.task = this.taskFactory.aboutTaskId(this.$state.params.id);
  }

  $onDestroy() {

    this.unsubscribe();
  }

  removeTask() {

    this.deleteTask(this.task.id);

    this.$state.go('home.task');
  }


}


