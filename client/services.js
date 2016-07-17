// custom Service can be used by all controllers:
angular.module('myApp').factory('AuthService',
  // $q is Angular service; helps run functions asynchronously and use their return values (or exceptions) when they are done processing
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {
    // create user variable
    var user = null
    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    })

    function isLoggedIn() {
      if(user) {
        return true
      } else {
        return false
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true
        } else {
          user = false
        }
      })
      // handle error
      .error(function (data) {
        user = false
      })
    }

    function login(username, password) {

      // create a new instance of deferred
      var deferred = $q.defer()

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true
            deferred.resolve()
          } else {
            user = false
            deferred.reject()
          }
        })
        // handle error
        .error(function (data) {
          user = false
          deferred.reject()
        })

      // return promise object
      return deferred.promise

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer()

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false
          deferred.resolve()
        })
        // handle error
        .error(function (data) {
          user = false
          deferred.reject()
        })

      // return promise object
      return deferred.promise

    }

    function register(username, password, email) {

      // create a new instance of deferred
      var deferred = $q.defer()

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password, email: email})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve()
          } else {
            deferred.reject()
          }
        })
        // handle error
        .error(function (data) {
          console.log('made it to register function in AuthService')
          deferred.reject()
        })

      // return promise object
      return deferred.promise

    }

}])
