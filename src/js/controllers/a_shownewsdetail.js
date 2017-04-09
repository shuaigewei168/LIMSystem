'use strict';
app.controller('ShowNewsDetailController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    $scope.noticID = $stateParams.noticID;
    $http.post('../api/newsopt.php', {
        opt : 'read',
        noticID : $scope.noticID
    })
    .then(function(response) {
        // console.log(response.data.data.noticdescrip.NoticTitle);
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){           
            $scope.title = response.data.data.noticdescrip.NoticTitle;
            $scope.author = response.data.data.noticdescrip.NoticAuthor;
            $scope.savetime = response.data.data.noticdescrip.SaveTime;
            $scope.content = response.data.data.content;
            // 解决字符串转成html的问题
            document.getElementById("content").innerHTML = "<s:property value="+$scope.content;
        }
    }, function(x) {
        
    });
  }])
;