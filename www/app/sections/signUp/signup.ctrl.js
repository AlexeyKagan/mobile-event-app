
export default class SignUp {

  constructor($location) {

    Object.assign(this, { $location });
  }

  $onInit() { }

  signUp() {

    this.$location.path('/home/task');
  }

}

