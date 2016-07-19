angular.module('myApp')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)
  .controller('usersController', usersController)
  .controller('booksController', booksController)

  /////////////////////////////////////////////
  // NOTE 'AuthService' defined in services.js
  /////////////////////////////////////////////
  usersController.$inject = ['$http']
  mainController.$inject = ['$rootScope', '$state', 'AuthService']
  loginController.$inject = ['$state', 'AuthService']
  logoutController.$inject = ['$state', 'AuthService']
  registerController.$inject = ['$state', 'AuthService']
  booksController.$inject = ['$http']

/////////////////////////////////////////////////
// NOTE currently not being used for anything:
/////////////////////////////////////////////////
function usersController() {
  var vm = this;
  vm.title = "The Users Controller"
}
/////////////////////////////////////////////////

function booksController($http) {
  console.log('Instantiated books controller');
  var vm = this;
  vm.title = "books controller"

  vm.searchReturn = [];

  vm.findBook = function(title, author) {
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key=AIzaSyAW-cYjhZ7Z_bR8AblZsJKS3DrC_tstxWQ'
      }).then(function successCallback(response) {
        console.log(response.data.items);
        vm.searchReturn = response.data.items;
      }, function errorCallback(error) {
        console.log(error);
    });
  }


  // vm.addBook = function (bookName, bookAuthor, bookCategory, bookPages) {
  //   $http.post('/api/books', {name: bookName, author: bookAuthor, category: bookCategory, page_count:bookPages})
  //   .success(function (response) {
  //     console.log(response);
  //     vm.booksList.push (response.book)
  //   })
  //     vm.bookName = ""
  // }
  // vm.deleteBook = function (id, index) {
  //   $http.delete('/api/books/' + id)
  //     .success(function (response) {
  //       console.log(response);
  //       vm.booksList.splice(index, 1)
  //   })
  // }

}

// mainController listens for state changes; on change, get user status
function mainController($rootScope, $state, AuthService) {
  var vm = this;
  vm.title = 'mainController'
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
        // on successful log in, load home view
        $state.go('home')
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
