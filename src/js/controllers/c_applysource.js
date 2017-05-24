'use strict';
app.controller('ApplySourceController', ['$scope', '$http', '$state','toaster','$stateParams', function($scope, $http,$state, toaster,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    $scope.toaster = {
        applycount: '',
        expecttime: '',
        appylyreason: ''
    };
var myDate = new Date();
    // 获取资源信息
    $http.post('../api/c_applysource.php', {
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
    }
    }, function(x) {
        
    });
    

    $scope.pop = function(){
        // $scope.content = document.getElementById('content').innerText;
        if($scope.toaster.applycount == '' ){
            toaster.pop('error', '请选择租借数量'); 
            return;
        }else if($scope.toaster.expecttime == ''){
            toaster.pop('error', '请填写归还时间');
            return;
        }else if($scope.toaster.appylyreason == ''){
            toaster.pop('error', '请填写申请理由');
            return;
        }else if($scope.toaster.applycount > $scope.SourceCount ){

            toaster.pop('error', '数量超出上限');
            return;
        }

        var choicedate = new Date($scope.toaster.expecttime); 
        if(myDate > choicedate ){
            toaster.pop('error', '请选择正确的归还日期');
            return;
        }
        var expecttime =choicedate.getFullYear() + '-' + (choicedate.getMonth() + 1) + '-' + choicedate.getDate();
        var NewSourceCount =  $scope.SourceCount - $scope.toaster.applycount;
        // 发送标题，内容和类型
        $http.post('../api/c_applysource.php', {
            ApplyCount: $scope.toaster.applycount,
            ExpectTime: expecttime,
            ApplyReason: $scope.toaster.appylyreason,
            SourceID : $stateParams.SourceID,
            SourceCount : $scope.SourceCount,
            NewSourceCount : NewSourceCount,
            opt: 'applysource'
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

