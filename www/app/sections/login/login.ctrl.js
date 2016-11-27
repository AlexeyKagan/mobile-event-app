import { getLocalDate } from 'core/date.utils.js';

export default class Login {

  constructor($state, AuthService, authToken, $scope, $ionicPush) {

    Object.assign(this, $state, AuthService, authToken, { $ionicPush });

    this.$scope = $scope;
    $scope.$ctrl = this;
  }

  $onInit() { }

  signIn() {
  	console.log('this', this);

    if (!this.login || !this.password) {
    	console.log('Uncorrect login or password', this.login, this.password);
    	return;
    }

    this.isLoading = true;

    this.doLogin(this.login, this.password).then(res => {
    	this.message = res.data.message;

    	console.log('res', res.data);
    	if (res.data.success) {


        console.log('ionic push', this.$ionicPush);

        // this.$ionicPush.register().then(function(t) {
        //   debugger;
        //   console.log('ionic push register', t);
        //   return $ionicPush.saveToken(t);
        // }).then(function(t) {
        //   console.log('Token saved:', t.token);
        // }).catch(err => console.log('$ionicPush err:', err));


        setTimeout(() => {
          this.isLoading = false;
          this.isSuccess = true;
          this.$scope.$apply();

          this.setToken(res.data.token);
          setTimeout(() => this.go(`home.taskForCurrentDate`, { date: getLocalDate() }), 300);

        }, 1000);
    	}
    }, err => {
    	console.log('something wrong err:', err);
    })
  }

}

Login.$inject = ['$state', 'AuthService', 'authToken', '$scope', '$ionicPush'];

