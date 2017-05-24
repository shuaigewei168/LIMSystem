'use strict';
app.controller('MyApplySourceController', ['$scope', '$http', '$state','$window', function($scope, $http,$state,$window) {
    $scope.user = {};
    $scope.authError = null;
    $scope.ischange = false;

      $http.post('../api/c_myapplysource.php', {
        opt: 'getsuccesssource'
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
      
    // 获取申请成功的资源
    $scope.applysuccess = function(){
      // console.log('申请成功');
      $http.post('../api/c_myapplysource.php', {
        opt: 'getsuccesssource'
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
    };

    // 获取申请中的资源
    $scope.applynow = function(){
      // console.log('申请中');
      setTimeout('',2000);
      $http.post('../api/c_myapplysource.php', {
        opt: 'getnowsource'
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          // console.log(response.data.data);
          $scope.sources2 = response.data.data;  
      }
      }, function(x) {
          
      });
    };

    // 获取申请失败的资源
    $scope.applyfailed = function(){
      // console.log('申请失败');     
      $http.post('../api/c_myapplysource.php', {
        opt: 'getfailedsource'
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          // console.log(response.data.data);
          $scope.sources3 = response.data.data;  
      }
      }, function(x) {
          
      });
    };

    // 获取已归还的资源
    $scope.applyfinished = function(){
      // console.log('已归还');
      $http.post('../api/c_myapplysource.php', {
        opt: 'getfinishedsource'
      })
      .then(function(response) {
      if( response.data.ret == '-1' ) {
          $state.go('access.z_signin');
      }else if(response.data.ret == '0'){
          // console.log(response.data.data);
          $scope.sources4 = response.data.data;  
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