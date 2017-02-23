'use strict';
app.controller('ShowNewsController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $http.post('../api/getuserinfo.php', {})
    .then(function(response) {
      if( response.data.ret == '-1' ) {
        $state.go('app.a_sendnews');
      }
    else{
        $scope.authError = 'Email or Password not right';
      }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
  }])
;

