
export default class Login {

  constructor($location) {

    Object.assign(this, { $location });
  }

  $onInit() { }

  signIn() { 

    this.$location.path('/home/task');
  }

}
