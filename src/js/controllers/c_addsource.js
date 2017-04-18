'use strict';
app.controller('AddSourceController', ['$scope', '$http', '$state', function($scope, $http,$state) {
    $scope.user = {};
    $scope.authError = null;
    // 上传图片变量
    // $scope.uploadimage='';
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.cropType="square";
    // 图片显示函数
    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      // $scope.uploadimage = file;
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    // 上传图片
    // $scope.add = function(){
    //   alert(document.getElementById("fileInput").files[0]);
    //   $http.post('../api/addsource.php', {
    //       sourcename: $scope.sourcename,
    //       sourcecount: $scope.sourcecount,
    //       uploadimage: document.getElementById("fileInput").files[0]
    //   })
    //   .then(function(response) {
    //   if( response.data.ret == '-1' ) {
    //       $state.go('access.z_signin');
    //   }else if(response.data.ret == '0'){
    //       $state.go('app.a_shownews',{type:'all'});   
    //   }
    //   }, function(x) {
          
    //   });
    // }

    	// $http({
			// 		url: API_URL+'uploadimage',
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': undefined
			// 		},
			// 		transformRequest: function() {
			// 			var formData = new FormData();
			// 			formData.append('file', $('#upfile')[0].files[0]);
			// 			return formData;
			// 		}
			// 	}).success(function (data) {
			// 		console.log(data);   //返回上传后所在的路径
			// 	});

}]);
