angular.module('myApp')
  .controller('mainController', mainController)
  .controller('loginController', loginController)
  .controller('logoutController', logoutController)
  .controller('registerController', registerController)
  .controller('usersController', usersController)
  // nav-bar directive:
  .directive('myNav', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/partials/navbar.html'
    }
  })
  // books collection pagination filter:
  .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  })

  /////////////////////////////////////////////
  // NOTE 'AuthService' defined in services.js
  /////////////////////////////////////////////
  usersController.$inject = ['$http', '$state']
  mainController.$inject = ['$rootScope', '$state', 'AuthService']
  loginController.$inject = ['$state', 'AuthService']
  logoutController.$inject = ['$state', 'AuthService']
  registerController.$inject = ['$state', 'AuthService']

//////////////////////
// USERS CONTROLLER
//////////////////////
function usersController($http, $state) {
  console.log('Instantiated usersController');
  var vm = this;
  vm.title = "The Users Controller"
  // this is the list response from Google Books API book search query
  vm.books = [];

  vm.haveRead = [];
  vm.favorites = [];

  // for pagination:
  vm.currentPage = 0;
  vm.pageSize = 8;

  vm.currentFavPage = 0;
  vm.favPageSize = 12;
  // end pagination variables

  vm.myStyle = {
    "color" : "#9c897c"
  }

  //for pagination:
  vm.numberOfPages = function(collection, numBooks){
    if(collection == 'haveRead') {
      return Math.ceil(vm.haveRead.length / numBooks);
    } else {
      return Math.ceil(vm.favorites.length / numBooks);
    }
  }

  vm.toggleFavorite = function(book) {
    $http.patch('/user/books/' + book._id + '?favorite=true', {params: {book: book}})
    .success(function(data) {
      $state.reload('home')
    })
  }

  vm.stars = function(book, highlighted, num) {
    if (highlighted == true) {
      if (book.rating >= num) {
        return true
      } else {
        return false
      }
    } else {
      if (book.rating < num) {
        return true
      } else {
        return false
      }
    }
  }

  vm.getBooks = function() {
    $http({
      method: 'GET',
      url: '/user/books'
      }).then(function successCallback(response) {
        // console.log(response.data)
        vm.haveRead = response.data;
      }, function errorCallback(error) {
        console.log(error);
    });
  }

  vm.getFavorites = function() {
    $http({
      method: 'GET',
      url: '/user/books/favorites'
      }).then(function successCallback(response) {
        vm.favorites = response.data;
      }, function errorCallback(error) {
        console.log(error);
    });
  }

  vm.findBook = function(title, author) {
    // console.log(!!author);
    vm.error = false;
    if(!author) {
      author = '';
    }
    if(!title) {
      title = '';
    }
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + title + '+inauthor:' + author + '&key= AIzaSyAD3kEHhu_dr_ndfkwGMyX5Ay_Oa2KDPsw'
      }).then(function successCallback(response) {
        if(!response.data.items) {
          // vm.error = true;
          // vm.errorMessage = "No books were found! Try again!";
        } else {
          vm.books = response.data.items;
          // console.log('vm.books:', vm.books);
          vm.searchForm = {};
        }
      }, function errorCallback(error) {
        console.log(error);
        vm.searchForm = {};
    });
  }

  vm.addBook = function(book) {
    $http.post('/user/books/add-book', {book: book})
    // data will be user obj with all their books
    .success(function(data) {
      // console.log('data is:', data)
      $state.reload('home')
    })
  }
  // patch req because actually updating a collection belonging to user
  // removing book from collection, not deleting a model
  vm.removeBook = function(book) {
    $http.patch('/user/books/' + book._id + '?delete=true', {params: {book: book}})
    .success(function(data) {
      // console.log('data is:', data)
      $state.reload('home')
    })
  }

  vm.updateRating = function(book, newRating) {
    $http.patch('/user/books/' + book._id + '?rating=' + newRating, {params: {book: book}})
    .success(function(data) {
      // console.log('data is:', data)
      $state.reload('home')
    })
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
        $state.go('index')
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
        $state.go('home')
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
