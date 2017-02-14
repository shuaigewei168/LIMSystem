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
        console.log(response.data.ret);
        if ( response.data.ret = '0' ) {
          $state.go('app.a_sendnews');
        }else{
          $scope.authError = 'Email or Password not right';
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;