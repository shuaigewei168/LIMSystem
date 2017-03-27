'use strict';

// signup controller
app.controller('RegisterFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.class = [
        { classname: '自动化1班', major:'自动化' , num: 1 },
        { classname: '自动化2班', major:'自动化' , num: 2 },
        { classname: '自动化3班', major:'自动化' , num: 3 },
        { classname: '自动化4班', major:'自动化' , num: 4 }
        ];
    $scope.signup = function() {
      $scope.authError = null;
      // console.log($scope.phone);
      $http.post('../api/register.php', {
        username: $scope.username, 
        realname: $scope.realname, 
        phone: $scope.phone, 
        qqnumber:$scope.qqnumber, 
        password: $scope.password,
        class: $scope.class.selected.num,
        major: $scope.class.selected.major
      })
      .then(function(response) {
        // console.log(response.data.data);
        if (response.data.ret != '0' ) {
          $scope.authError = response.data.data;
        }else{
          $state.go('app.a_shownews');
        }
      }, function(x) {
        $scope.authError = '服务器错误';
      });
    };
  }])
 ;