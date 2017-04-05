'use strict';
app.controller('ShowNewsController', ['$scope', '$http', '$state','$stateParams', function($scope, $http, $state,$stateParams) {
    $scope.user = {};
    $scope.authError = null;
    $scope.isshow = false;
    $scope.typeshow = $stateParams.type ; //消息类型选择

    // 阅读消息
    $scope.readthis = function(){

    };


    // 获取消息
    $http.post('../api/shownews.php', {
        subnotic : $scope.typeshow
    })
    .then(function(response) {
      // console.log(response.data.data.task);
    if( response.data.ret == '-1' ) {
        $state.go('access.z_signin');
    }else if(response.data.ret == '0'){

        // 判断显示那一个消息
        if($scope.typeshow == 'all'){
          $scope.isshow = true;
          $scope.tasks = response.data.data.task;  
          $scope.messages = response.data.data.message; 
          $scope.articles = response.data.data.article; 
          $scope.questions = response.data.data.question;
        }else if($scope.typeshow == 'task'){
          $scope.isshow = false;
          $scope.notictypes = '--任务公告--';
          $scope.notictype = response.data.data.task;
        }else if($scope.typeshow == 'message'){
          $scope.isshow = false;
          $scope.notictypes= '--消息公告--';  
          $scope.notictype = response.data.data.message;         
        }else if($scope.typeshow == 'article'){
          $scope.isshow = false;
          $scope.notictypes= '--文章公告--';
          $scope.notictype = response.data.data.article;
        }else if($scope.typeshow == 'question'){
          $scope.isshow = false;
          $scope.notictypes = '--问题公告--';
          $scope.notictype = response.data.data.question;
        }

    }
    }, function(x) {
        
    });
  }]);

// 弹框
 app.controller('ShowModalInstanceCtrl', ['$scope', '$modalInstance', 'items','$state','$stateParams','$window', '$http', function($scope, $modalInstance, items, $state,$stateParams,$window,$http) {
    // 点击确认删除
    $scope.ok = function (noticID) {
      $modalInstance.close('ok');
      $state.go('app.a_shownews',{type:$stateParams.type});
    };
    //点击取消删除
    $scope.cancel = function () {
      $state.go('app.a_shownews',{type:$stateParams.type});
      // $window.location.reload();
      $modalInstance.dismiss('cancel');
    };
  }]); 


  app.controller('ShowModalControler', ['$scope', '$modal', '$log','$state','$stateParams', function($scope, $modal, $log, $state,$stateParams) {
    $scope.open = function (size,noticID) {
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
        $http.post('../api/newsopt.php', {
            opt : 'delete',
            noticID : noticID
        })
        .then(function(response) {
      
        }, function(x) {
            
        });
        // 取消删除
      }, function () {

      });
    };

  }])
  ;