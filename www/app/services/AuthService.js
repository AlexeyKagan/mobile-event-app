
let _AuthService = {};

angular.module('app.auth', [])
.factory('AuthService', ($http, authToken) => {

    const authFactory = {};	

    authFactory.doLogin = (username, password) => {
        return $http.post('/api/login', {
            username: username,
            password: password
        })
    };

    authFactory.doSignup = data => $http.post('/api/signup', data);

    authFactory.doLogout = () => authToken.removeToken();

    authFactory.isLoggedIn = () => authToken.getToken();

    authFactory.getUser = () => {

        if (authToken.getToken()) {

            return $http.get('/api/me', {cache: true});
        }
        
        return $q.reject({message: 'User has no token.'});
    };

    _AuthService = authFactory;
    return authFactory;
})
.factory('authToken', ($window) => {

	const authToken = {};

    authToken.getToken = () => $window.localStorage.getItem('token');

    authToken.setToken = (token) => {

        if (token) {
            $window.localStorage.setItem('token', token);
        }
    };

    authToken.removeToken = () => $window.localStorage.removeItem('token');


    return authToken;
})
.factory('AuthInterceptor', ($q, authToken, $location) => {
	// console.log('AuthInterceptor', $state);
    const interceptorFactory = {};		

    interceptorFactory.request = function (config) {
    	console.log('interceptorFactory', config);
        const token = authToken.getToken();
        
        if (token) {
            // config.headers['x-access-token'] = token;
        }

        return config;
    };

    interceptorFactory.responseError = function (response) {

        if (response.status == 403) {

            authToken.removeToken();

            $location.path('/login');
        }

        return $q.reject(response);
    };
    
    
    return interceptorFactory;
});

function getAuthService() {
    return _AuthService;
}

export default getAuthService;