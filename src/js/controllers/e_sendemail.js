'use strict';
app.controller('SentEmailController', ['$scope', '$http', '$state','toaster', function($scope, $http,$state, toaster) {
    $scope.user = {};
    $scope.authError = null;
    $scope.toaster = {
        reciver: '',
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
        $scope.content = document.getElementById('content').innerText;
        if($scope.toaster.reciver == '' ){
            toaster.pop('error', '请填写收件人'); 
            return;
        }else if($scope.toaster.title == ''){
            toaster.pop('error', '请填写标题');
            return;
        }else if($scope.toaster.text == ''){
            toaster.pop('error', '请填写内容');
            return;
        }
        // 发送标题，内容和类型
        $http.post('../api/e_sendemail.php', {
            reciver: $scope.toaster.reciver,
            title: $scope.toaster.title,
            text: $scope.toaster.text,
            sketch : $scope.content.substr(28,60)
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

