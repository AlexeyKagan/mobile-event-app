
export default class SignUp {

  constructor(...args) {

    Object.assign(this, ...args);
  }

  $onInit() { }

  signUp() {

  	console.log('this', this);
    


    if (!this.login || !this.password || !this.email || !this.date) {
    	console.log('Uncorrect login, password, date or email', this.login, this.password, this.email);
    	return;
    }

    const data = {
    	username: this.login,
    	password: this.password,
    	email: this.email,
    	date: this.date,
    	picture: this.picture    	
    }

    this.doSignup(data).then(res => {
    	this.message = res.data.message
    	console.log('res', res.data);
    	if (res.data.success) {
    		this.setToken(res.data.token);
    		this.go('home.task');
    	}
    }, err => {
    	console.log('something wrong err:', err);
    });

  }

  loadPicture() {

  }

}

SignUp.$inject = ['$state', 'AuthService', 'authToken'];

