'use strict';
app.controller('ShowEmailsController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    $scope.isshow = false;
    $scope.typeshow = $stateParams.type ; //消息类型选择

    // 阅读消息
    $scope.read = function(EmailID){
      $state.go('app.e_emailsdetail',{EmailID:EmailID});
    };


    // 获取消息
    $http.post('../api/e_emaillist.php', {
        // subnotic : $scope.typeshow
    })
    .then(function(response) {
      // console.log(response.data.data.task);
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){
        $scope.Emails = response.data.data;
    }
    }, function(x) {
        
    });
  }]);

// 弹框
 app.controller('ShowModalInstanceCtrl', ['$scope', '$modalInstance', 'items','$state','$stateParams','$window', '$http', function($scope, $modalInstance, items, $state,$stateParams,$window,$http) {
    // 点击确认删除
    $scope.ok = function (EmailID) {
      $modalInstance.close('ok');
      $window.location.reload();
    };
    //点击取消删除
    $scope.cancel = function () {
      $state.go('app.a_shownews',{type:$stateParams.type});
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]); 


  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$http', function($scope, $modal, $log, $state,$http) {
    $scope.open = function (size,EmailID) {
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
        $http.post('../api/e_emailsdetail.php', {
            opt : 'delete',
            EmailID : EmailID
        })
        .then(function(response) {
          if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
          }
        }, function(x) {
            
        });
        // 取消删除
      }, function () {

      });
    };

  }])
  ;