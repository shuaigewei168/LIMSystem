'use strict';
app.controller('SigninFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('../api/login.php', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
        console.log(response.data.ret);
        if( response.data.ret == '0' ) {
          $state.go('app.a_sendnews');
        }else{
          $scope.authError = '账号或者密码错误';
        }
      }, function(x) {
        $scope.authError = '服务器错误';
      });
    };
  }])
;