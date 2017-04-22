import { getLocalDate } from 'core/date.utils.js';

export default class SignUp {

  constructor($state,AuthService, authToken, toaster) {

    Object.assign(this, $state, AuthService, authToken, { toaster });
  }

  $onInit() { }

  showWarningToasty(text) {

    this.toaster.pop({
      type: 'warning',
      body: text,
      timeout: 3000
    });
  }

  signUp() {

  	console.log('this', this);

    if (!this.login || !this.password || !this.email) {
    	console.log('Uncorrect login, password, date or email', this.login, this.password, this.email);
      this.showWarningToasty('Заполните поля.');
    	return;
    }

    const data = {
    	username: this.login,
    	password: this.password,
    	email: this.email,
    	date: this.date,
    	picture: this.picture
    };

    this.doSignup(data).then(res => {
    	this.message = res.data.message;
    	console.log('res', res.data);
    	if (res.data.success) {
    		this.setToken(res.data.token);

        this.go(`home.taskForCurrentDate`, { date: getLocalDate() })

    	} else {
        const engErrors = {
          'Username already exists.': 'Имя пользователя уже занято.'
        };

        this.showWarningToasty(engErrors[res.data.msg] || 'Произошла ошибка при создании пользователя');
        this.isLoading = false;
      }
    }, err => {
    	console.log('something wrong err:', err);
    });

  }

  loadPicture() {

  }

}

SignUp.$inject = ['$state', 'AuthService', 'authToken', 'toaster'];

