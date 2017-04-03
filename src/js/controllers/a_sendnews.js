'use strict';
app.controller('SentNewsController', ['$scope', '$http', '$state','toaster', function($scope, $http,$state, toaster) {
    $scope.user = {};
    $scope.authError = null;
    $scope.toaster = {
        type: '',
        title: '',
        text: ''
    };
    // 获取用户信息
    // $http.post('../api/getuserinfo.php', {})
    // .then(function(response) {
    //   if( response.data.ret == '-1' ) {
    //     $state.go('access.z_signin');
    //   }}, function(x) {
        
    //   });
    $scope.pop = function(){
        // console.log($scope.toaster.type);
        if($scope.toaster.type == '' ){
            toaster.pop('error', '请选择类型'); 
            return;
        }else if($scope.toaster.title == ''){
            toaster.pop('error', '请填写标题');
            return;
        }else if($scope.toaster.text == ''){
            toaster.pop('error', '请填写内容');
            return;
        }
        // 发送标题，内容和类型
        $http.post('../api/sendnews.php', {
            type: $scope.toaster.type,
            title: $scope.toaster.title,
            text: $scope.toaster.text
        })
        .then(function(response) {
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){
            $state.go('app.a_shownews',{type:'all'});   
        }
        }, function(x) {
            
        });
    };


    
  }]);

