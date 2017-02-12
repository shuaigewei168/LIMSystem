'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('../api/z_login.php', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        console.log(response);
        if ( !response.data.user ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $state.go('app.a_sendnews');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;