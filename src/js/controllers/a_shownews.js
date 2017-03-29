'use strict';
app.controller('ShowNewsController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    // $http.post('../api/getuserinfo.php', {})
    // .then(function(response) {
    //   if( response.data.ret == '-1' ) {
    //     $state.go('access.z_signin');
    //   }}, function(x) {
        
    //   });
      // 获取消息
      $http.post('../api/shownews.php', {
          
      })
      .then(function(response) {
        // console.log(response.data.data.task);
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          $scope.tasks = response.data.data.task;  
          $scope.messages = response.data.data.message; 
        //   if($scope.messages.length < 4){
        //       for(var i=$scope.messages.length;i<4;i++ )
        //       $scope.messages[i].NoticTitle = '';
        //       $scope.messages[i].NoticText = '';
        //   }
          console.log($scope.messages);
          $scope.articles = response.data.data.article; 
          $scope.questions = response.data.data.question; 
      }
      }, function(x) {
          
      });
  }])
;

