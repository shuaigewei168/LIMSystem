'use strict';
app.controller('FileListController', ['$scope', '$http', '$state','$window', function($scope, $http,$state,$window) {
    $scope.user = {};
    $scope.authError = null;
    $scope.ischange = false;

    // 修改资源
    $scope.download = function(FileID){
        window.location.href="../api/d_sharefile.php?opt=download&FileID="+FileID;
    };

    // 保存资源
    $scope.saveFile = function(){
      $scope.ischange = false;
    };

    $http.post('../api/d_sharefile.php', {
      opt: 'getfile'
    })
    .then(function(response) {
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){
        // console.log(response.data.data);
        $scope.Files = response.data.data;  
    }
    }, function(x) {
        
    });
  

  }]);

// 弹框
 app.controller('ShowModalInstanceCtrl', ['$scope', '$modalInstance', 'items','$state','$stateParams','$window', '$http', function($scope, $modalInstance, items, $state,$stateParams,$window,$http) {
    // 点击确认删除
    $scope.ok = function (FileID) {
      $modalInstance.close('ok');
      // $window.location.reload();
    };
    //点击取消删除
    $scope.cancel = function () {
      $state.go('File.c_Filelist');
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]); 


  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$http','$window', function($scope, $modal, $log, $state,$http,$window) {
    $scope.open = function (size,FileID) {
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
        $http.post('../api/getFile.php', {
            opt : 'deleteFile',
            FileID : FileID
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