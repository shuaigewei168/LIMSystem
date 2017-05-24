'use strict';
app.controller('MemberApplySourceController', ['$scope', '$http', '$state','$window', function($scope, $http,$state,$window) {
    $scope.user = {};
    $scope.authError = null;
    $scope.ischange = false;

      $http.post('../api/c_memberapply.php', {
        opt: 'getapplyssource'
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          // console.log(response.data.data);
          $scope.sources1 = response.data.data;  
      }
      }, function(x) {
          
      });

    // 同意
    $scope.agree = function(SourceID,ApplyID,SourceCount,ApplyCount){
      $http.post('../api/c_memberapply.php', {
        opt: 'agree',
        SourceID: SourceID,
        ApplyID:ApplyID,
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          $window.location.reload(); 
      }
      }, function(x) {
          
      });
    };

    //不同意
    $scope.refuse = function(SourceID,ApplyID,SourceCount,ApplyCount){
      // console.log('申请成功');
      $http.post('../api/c_memberapply.php', {
        opt: 'refuse',
        SourceID: SourceID,
        ApplyID:ApplyID,
        NowCount:parseInt(SourceCount) + parseInt(ApplyCount)
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          $window.location.reload();  
      }
      }, function(x) {
          
      });
    };

  }]);

// 弹框
 app.controller('ShowModalInstanceCtrl', ['$scope', '$modalInstance', 'items','$state','$stateParams','$window', '$http', function($scope, $modalInstance, items, $state,$stateParams,$window,$http) {
    // 点击确认删除
    $scope.ok = function (SourceID) {
      $modalInstance.close('ok');
      // $window.location.reload();
    };
    //点击取消删除
    $scope.cancel = function () {
      $state.go('source.c_myapplysource');
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]); 


  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$http','$window', function($scope, $modal, $log, $state,$http,$window) {
    $scope.open = function (size,ApplyID,ApplyCount,SourceID) {
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
        $http.post('../api/c_myapplysource.php', {
            opt : 'deletmyapplysource',
            ApplyID : strs[0],
            NowCount : parseInt(strs[1]) + parseInt(strs[3]),
            SourceID: strs[2],
            tpye: strs[4]
        })
        .then(function(response) {
          if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
          }else if(response.data.ret == '1' ){
            alert(response.data.data);
          }else if(response.data.ret == '0'){
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