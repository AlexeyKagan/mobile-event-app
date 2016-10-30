import { getLocalDate } from 'core/date.utils.js';

export default class Login {

  constructor(...args) {

    Object.assign(this, ...args);
  }

  $onInit() { }

  signIn() {
  	console.log('this', this);

    if (!this.login || !this.password) {
    	console.log('Uncorrect login or password', this.login, this.password);
    	return;
    }

    this.doLogin(this.login, this.password).then(res => {
    	this.message = res.data.message;

    	console.log('res', res.data);
    	if (res.data.success) {
    		this.setToken(res.data.token);

        this.go(`home.taskForCurrentDate`, { date: getLocalDate() })
    	}
    }, err => {
    	console.log('something wrong err:', err);
    })
  }

}

Login.$inject = ['$state', 'AuthService', 'authToken'];

