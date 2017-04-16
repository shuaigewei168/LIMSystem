'use strict';
app.controller('AddSourceController', ['$scope', '$http', '$state', function($scope, $http,$state) {
    $scope.user = {};
    $scope.authError = null;
    // 上传图片变量
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="square";
    // 图片显示函数
    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

}]);
