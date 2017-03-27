'use strict';
app.controller('ShowNewsController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $http.post('../api/getuserinfo.php', {})
    .then(function(response) {
      if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
      }}, function(x) {
        
      });
      // 获取消息
      $http.post('../api/shownews.php', {
          
      })
      .then(function(response) {
        console.log(response.data.ret);
      if( response.data.ret == '-1' ) {
          // $state.go('access.z_signin');
           console.log(response.data.data);
      }else if(response.data.ret == '0'){
          // $state.go('app.a_shownews');  
          console.log(response.data.data); 
      }
      }, function(x) {
          
      });
  }])
;

