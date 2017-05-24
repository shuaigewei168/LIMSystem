'use strict';
app.controller('ModifySourceController', ['$scope', '$http', '$state','toaster','$stateParams', function($scope, $http,$state, toaster,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
        $scope.toaster = {
        modifycount: '',
        modifyname: ''
    };
    // 获取资源信息
    $http.post('../api/c_modifysource.php', {
        SourceID : $stateParams.SourceID,
        opt : 'getsource'
    })
    .then(function(response) {
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){
        $scope.SourcePath = response.data.data[0].SourcePath;
        $scope.SourceCount = response.data.data[0].SourceCount;
        $scope.SourceName = response.data.data[0].SourceName;
        $scope.TotalCount = response.data.data[0].TotalCount;
        $scope.ApplyTotalCount = response.data.data[0].TotalCount - response.data.data[0].SourceCount;
    }
    }, function(x) {
        
    });
    

    $scope.pop = function(){
        var NewTotalCount = $scope.TotalCount - $scope.SourceCount + $scope.toaster.modifycount;
        // console.log($scope.TotalCount);
        // console.log($scope.SourceName);
        // console.log($scope.toaster.modifycount);
        // $scope.content = document.getElementById('content').innerText;
        if($scope.toaster.modifycount == '' && $scope.toaster.modifyname == ''){
            toaster.pop('error', '未作出任何修改'); 
            return;
        }
        $http.post('../api/c_modifysource.php', {
            ModifyCount: $scope.toaster.modifycount,
            ModifyName: $scope.toaster.modifyname,
            SourceID : $stateParams.SourceID,
            NewTotalCount : NewTotalCount,
            opt: 'modifysource'
        })
        .then(function(response) {
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){
            $state.go('source.c_sourcelist');   
        }
        }, function(x) {
            
        });
    };


    
  }]);

