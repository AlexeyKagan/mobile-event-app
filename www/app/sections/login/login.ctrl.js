import { getLocalDate } from 'core/date.utils.js';

export default class Login {

  constructor($state, AuthService, authToken, $scope, $ionicPush, toaster) {

    Object.assign(this, $state, AuthService, authToken, { $ionicPush, toaster });

    this.$scope = $scope;
    $scope.$ctrl = this;
  }

  $onInit() { }

  showWarningToasty(text) {

    this.toaster.pop({
      type: 'warning',
      body: text,
      timeout: 3000
    });
  }

  signIn() {
  	console.log('this', this);

    if (!this.login || !this.password) {
    	console.log('Uncorrect login or password', this.login, this.password);
      this.isLoading = false;
      this.showWarningToasty('Введите логин или пароль');
    	return;
    }

    this.isLoading = true;

    this.doLogin(this.login, this.password).then(res => {
    	this.message = res.data.message;

    	console.log('res', res.data);
    	if (res.data.success) {

        setTimeout(() => {

          this.isSuccess = true;

          this.setToken(res.data.token);

          setTimeout(() => this.go(`home.taskForCurrentDate`, { date: getLocalDate() }), 300);

        }, 1000);
    	} else {
        // TODO on server side need error codes.
    	  const engErrors = {
          'Authentication failed. User not found.': 'Ошибка аутентификации. Пользователь не найден.',
          'Authentication failed. Wrong password.': 'Ошибка аутентификации. Неправильный пароль.'
        };

        this.showWarningToasty(engErrors[res.data.msg] || res.data.msg);
        this.isLoading = false;
        // this.$scope.$apply();
      }


    }, err => {
      this.isLoading = false;
    	console.log('something wrong err:', err);
    })
  }

}

Login.$inject = ['$state', 'AuthService', 'authToken', '$scope', '$ionicPush', 'toaster'];

