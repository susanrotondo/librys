angular.module('myApp')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)
  .controller('usersController', usersController)

  /////////////////////////////////////////////
  // NOTE 'AuthService' defined in services.js
  /////////////////////////////////////////////
  usersController.$inject = ['$http']
  mainController.$inject = ['$rootScope', '$state', 'AuthService']
  loginController.$inject = ['$state', 'AuthService']
  logoutController.$inject = ['$state', 'AuthService']
  registerController.$inject = ['$state', 'AuthService']

function usersController() {
  var vm = this;
  vm.title = "The Users Controller"

}

// mainController listens for state changes; on change, get user status
function mainController($rootScope, $state, AuthService) {
  var vm = this;
  $rootScope.$on('$stateChangeStart', function (event) {
    // console.log("Changing states")
    AuthService.getUserStatus()
      .then(function(data){
        // set current user to response data
        vm.currentUser = data.data.user
      })
  })
}

// LOGIN CONTROLLER:
function loginController($state, AuthService) {
  var vm = this;
  vm.login = function () {

    // initial values
    vm.error = false
    vm.disabled = true

    // call login from service
    AuthService.login(vm.loginForm.username, vm.loginForm.password)
      // handle success
      .then(function () {
        console.log("Successful login...")
        $state.go('profile')
        vm.disabled = false
        vm.loginForm = {}
      })
      // handle error
      .catch(function () {
        console.log("Whoops...")
        vm.error = true
        vm.errorMessage = "Invalid username and/or password"
        vm.disabled = false
        vm.loginForm = {}
      })
  }
}


// LOGOUT CONTROLLER:
function logoutController($state, AuthService) {
  var vm = this;
  vm.logout = function () {

    // call logout from service
    AuthService.logout()
      .then(function () {
        // TODO once a login button that will go to login view on click is on index, change to .go('index')
        $state.go('login')
      })
  }
}

// REGISTER CONTROLLER:
function registerController($state, AuthService) {
  var vm = this;
  vm.register = function () {

    // initial values
    vm.error = false
    vm.disabled = true

    // call register in AuthService:
    AuthService.register(vm.registerForm.username, vm.registerForm.password, vm.registerForm.email)
      // handle success
      .then(function () {
        $state.go('profile')
        vm.disabled = false
        vm.registerForm = {}
      })
      // handle error
      .catch(function () {
        console.log('in the register controller')
        vm.error = true
        vm.errorMessage = "Something went wrong!"
        vm.disabled = false
        vm.registerForm = {}
      })
  }
}
