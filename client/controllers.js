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

//////////////////////
// USERS CONTROLLER
//////////////////////
function usersController($http) {
  console.log('Instantiated usersController');
  var vm = this;
  vm.title = "The Users Controller"
  vm.haveRead = [];
  vm.books = [];

  vm.getBooks = function() {
    $http({
      method: 'GET',
      url: '/user/books'
      }).then(function successCallback(response) {
        console.log(response.data)
        vm.haveRead = response.data;
      }, function errorCallback(error) {
        console.log(error);
    });
  }

  vm.findBook = function(title, author) {
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key=AIzaSyAW-cYjhZ7Z_bR8AblZsJKS3DrC_tstxWQ'
      }).then(function successCallback(response) {
        vm.books = response.data.items;
        console.log(vm.books);
      }, function errorCallback(error) {
        console.log(error);
    });
  }

  vm.addBook = function(book) {
    // console.log('creating book:', book)
    $http.post('/user/add-book', {book: book})
    // data will be user obj with all their books
    .success(function(data) {
      console.log('data is:', data)
    })
  }

  vm.removeBook = function(book) {
    console.log('deleting book:', book);
    // TODO change to '/user/book/' + book._id ??? since adding the book id to the user route doesn't make sense???
    $http.patch('/user/' + book._id, {params: {book: book}})
    .success(function(data) {
      console.log('data is:', data)
    })
  }

  vm.editRating = function(book) {
    console.log('editing rating to book:', book);
  }

}
////////////////////////
// END USERS CONTROLLER
////////////////////////


/////////////////////////////////////////////////////////////
// MAIN CONTROLLER
// listens for all state changes; on change, gets user status
/////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////
// END MAIN CONTROLLER
/////////////////////////////////////////////////////////////

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
