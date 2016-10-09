
export default class TaskView {

  constructor($ionicSideMenuDelegate) {

    Object.assign(this, { $ionicSideMenuDelegate  });
  }

  exit() {

    ionic.Platform.exitApp();
  }

  toggleLeft() {

    this.$ionicSideMenuDelegate.toggleLeft();
  }

}

 