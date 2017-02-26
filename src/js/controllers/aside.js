'use strict';
app.controller('AsideController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $http.post('../api/getuserinfo.php', {})
    .then(function(response) {
      if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
        $scope.realname = response.data.data['RealName'];
        $scope.username = response.data.data['UserName'];
        $scope.level = response.data.data['Level'];
      }
      }, function(x) {
        
      });
  }])
;

