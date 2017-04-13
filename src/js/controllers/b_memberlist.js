'use strict';
app.controller('NumberListController', ['$scope', '$http', '$filter','$window', function($scope, $http, $filter,$window) {
  $scope.avaliables = ['可用',"不可用"];
  $scope.savestate = '';
  $scope.savestatewrong = '';
  $scope.issavestate = false;
  $http.post('../api/memberlist.php', {
      opt : 'getinfo'
    })
    .then(function(response) {
        // console.log(response.data.data.noticdescrip.NoticTitle);
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){  
          $scope.items = response.data.data.items ;
          $scope.groups = response.data.data.groups ;
          //  console.log(response.data.data.groups);
        }
    }, function(x) {
        
    });
 
  $scope.filter = '';
  $scope.selectGroup = function(item){  
    $scope.savestate = "";  
    angular.forEach($scope.groups, function(item) {
      item.selected = false;
    });
    $scope.group = item;
    $scope.group.selected = true;
    $scope.issavestate = false;
    $scope.filter = item.name;
  };

  $scope.selectItem = function(item){    
    $scope.savestate = "";
    angular.forEach($scope.items, function(item) {
      item.selected = false;
      item.editing = false;
      $scope.issavestate = false;
    });
    $scope.item = item;
    $scope.item.selected = true;
  };

  $scope.editItem = function(item){
    if(item && item.selected){
      item.editing = true;
      $scope.issavestate = false;
    }
  };

  $scope.doneEditing = function(item){
    item.editing = false;
    $http.post('../api/memberlist.php', {
        opt : 'saveinfo',
        userID : $scope.item.userID,
        major : $scope.item.major,
        class : $scope.item.class,
        realname : $scope.item.realname,
        username : $scope.item.username,
        level : $scope.item.level,
        mobile : $scope.item.mobile,
        qqnumber : $scope.item.qqnumber,
        regtime : $scope.item.regtime,
        avaliable : $scope.item.avaliable
    })
    .then(function(response) {
        // console.log(response.data.data.noticdescrip.NoticTitle);
        if( response.data.ret == '-1' ) {
            $state.go('access.z_signin');
        }else if(response.data.ret == '0'){
            $scope.issavestate = true;
            $scope.savestate = "修改成功";
          //  console.log(response.data.ret);
        }else{
            $scope.savestatewrong = response.data.data;
            setTimeout(function() {
              $window.location.reload();
            }, 500);
            
        }
    }, function(x) {
        
    });
  };

}]);
