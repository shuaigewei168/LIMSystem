'use strict';
app.controller('SourceListController', ['$scope', '$http', '$state', function($scope, $http,$state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.ischange = false;

    // 修改资源
    $scope.changesource = function(){
      $scope.ischange = true;
    };

    // 保存资源
    $scope.savesource = function(){
      $scope.ischange = false;
    };

    $http.post('../api/getsource.php', {
      opt: 'getsource'
    })
    .then(function(response) {
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){
        // console.log(response.data.data);
        $scope.sources = response.data.data;  
    }
    }, function(x) {
        
    });
  

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
      $state.go('source.c_sourcelist');
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]); 


  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$http','$window', function($scope, $modal, $log, $state,$http,$window) {
    $scope.open = function (size,SourceID) {
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
        $http.post('../api/getsource.php', {
            opt : 'deletesource',
            SourceID : SourceID
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