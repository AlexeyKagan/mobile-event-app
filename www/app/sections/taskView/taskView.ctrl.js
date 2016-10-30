import { getLocalDate } from 'core/date.utils.js';

export default class TaskView {

  constructor($ionicSideMenuDelegate, $state) {

    Object.assign(this, { $ionicSideMenuDelegate, $state  });
  }

  exit() {

    ionic.Platform.exitApp();
  }

  toggleLeft() {

    this.$ionicSideMenuDelegate.toggleLeft();
  }

  goToMain() {


    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate() })
  }

}

