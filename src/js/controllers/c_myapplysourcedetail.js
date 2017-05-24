'use strict';
app.controller('DetailSourceController', ['$scope', '$http', '$state','toaster','$stateParams', function($scope, $http,$state, toaster,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    // $scope.toaster = {
    //     applycount: '',
    //     expecttime: '',
    //     appylyreason: ''
    // };
var myDate = new Date();
    // 获取资源信息
    $http.post('../api/c_myapplysourcedetail.php', {
        ApplyID : $stateParams.ApplyID,
        opt : 'getsource'
    })
    .then(function(response) {
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){
        $scope.sources1 = response.data.data;
        $scope.ApplyReason = response.data.data[0].ApplyReason;
        // var a = response.data.data[0].ExpectTime;
        // var expertDate = new Date(a);
        // if(expertDate < myDate){
        //     $scope.iscontinususe = '0';
        //     console.log($scope.iscontinususe);
        // }
    }
    }, function(x) {
        
    });


    
        // 续借
    // $scope.pop = function(){
    //     if($scope.toaster.expecttime == ''){
    //         toaster.pop('error', '请填写归还时间');
    //         return;
    //     }

    //     var choicedate = new Date($scope.toaster.expecttime); 
    //     if(myDate > choicedate ){
    //         toaster.pop('error', '请选择正确的归还日期');
    //         return;
    //     }
    //     var expecttime =choicedate.getFullYear() + '-' + (choicedate.getMonth() + 1) + '-' + choicedate.getDate();
    //     var NewSourceCount =  $scope.SourceCount - $scope.toaster.applycount;
    //     // 发送标题，内容和类型
    //     $http.post('../api/c_myapplysourcedetail.php', {
    //         ApplyCount: $scope.toaster.applycount,
    //         ExpectTime: expecttime,
    //         ApplyReason: $scope.toaster.appylyreason,
    //         SourceID : $stateParams.SourceID,
    //         SourceCount : $scope.SourceCount,
    //         NewSourceCount : NewSourceCount,
    //         opt: 'applysource'
    //     })
    //     .then(function(response) {
    //     if( response.data.ret == '-1' ) {
    //         $state.go('access.z_signin');
    //     }else if(response.data.ret == '0'){
    //         $state.go('source.c_sourcelist');   
    //     }
    //     }, function(x) {
            
    //     });
    // };
 
  }]);

// 弹框
 app.controller('ShowModalInstanceCtrl', ['$scope', '$modalInstance', 'items','$state','$stateParams','$window', '$http', function($scope, $modalInstance, items, $state,$stateParams,$window,$http) {
    // 点击确认删除
    $scope.ok = function (SourceID) {
      $modalInstance.close('ok');
    //   $window.location.reload();
    };
    //点击取消删除
    $scope.cancel = function () {
      $state.go('source.c_myapplysource');
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]);

  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$http','$window', function($scope, $modal, $log, $state,$http,$window) {
    $scope.open = function (size,ApplyID) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ShowModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;  
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        // 确认删除
        $scope.selected = selectedItem;
        var strs=ApplyID.split(",");
        $http.post('../api/c_myapplysourcedetail.php', {
            opt : 'guihuanmyapplysource',
            ApplyID : strs[0],
            NowCount : parseInt(strs[1]) + parseInt(strs[3]),
            SourceID: strs[2],
        })
        .then(function(response) {
            console.log(response.data.ret);
          if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
          }else if(response.data.ret == '1' ){
            alert('归还失败');
          }else if(response.data.ret == '0'){
            // $state.go('source.c_myapplysource');
            $window.location.reload();
          }
        }, function(x) {
            
        });
        // 取消删除
      }, function () {

      });
    };

  }])
  ;