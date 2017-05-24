'use strict';
app.controller('ShowEmailDetailController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    $scope.EmailID = $stateParams.EmailID;
    $http.post('../api/e_emailsdetail.php', {
        opt : 'read',
        EmailID : $scope.EmailID
    })
    .then(function(response) {
        // console.log(response.data.data.Emaildescrip.EmailTitle);
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){           
            $scope.EmailTitle = response.data.data.Emaildescrip.EmailTitle;
            $scope.SenderName = response.data.data.Emaildescrip.SenderName;
            $scope.SendTime = response.data.data.Emaildescrip.SendTime;
            $scope.content = response.data.data.content;
            // 解决字符串转成html的问题
            document.getElementById("content").innerHTML = "<s:property value="+$scope.content;
        }
    }, function(x) {
        
    });
  }])
;