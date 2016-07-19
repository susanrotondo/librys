var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'templates/index.html'
    })
    // home will be where user can view collections and initiate search for books
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      restricted: true
    })
    // .state('book', {
    //   url: '/books/:id',
    //   templateUrl: 'templates/profile.html',
    //   restricted: true,
    //   controller: 'booksController as bc'
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginController as loginCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'logoutController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerController as registerCtrl'
    })
    // profile will be user account page
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile.html',
      restricted: true,
      controller: 'usersController as usersCtrl'
    })

})

// FRONT END USER AUTHENTICATION MIDDLEWARE - CHECKS USER AUTH ON EVERY STATE CHANGE
myApp.run(function ($rootScope, $location, $state, AuthService) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    // user logged in?
    AuthService.getUserStatus()
    .then(function(){
      // if not logged in and route is auth-restricted, re-direct to root/index state
      if (toState.restricted && !AuthService.isLoggedIn()){
        // $location.path('/')
        $state.go('index');
      }
    })
  })
});
