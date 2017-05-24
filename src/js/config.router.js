'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/app/a_shownews/all');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })


              //资讯平台
              .state('app.a_shownews', {
                  url: '/a_shownews/{type}',
                  templateUrl: 'tpl/a_shownews.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/a_shownews.js']);
                    }]
                  }
              })
              .state('app.a_shownewsdetail', {
                  url: '/a_shownewsdetail/{noticID}',
                  templateUrl: 'tpl/a_shownewsdetail.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/a_shownewsdetail.js']);
                    }]
                  }
              })
              .state('app.a_sendnews', {
                  url: '/a_sendnews',
                  templateUrl: 'tpl/a_sendnews.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/a_sendnews.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })

              //成员列表
              .state('contact', {
                  abstract: true,
                  url: '/contact',
                  templateUrl: 'tpl/b_layout.html'
              })
              .state('contact.b_memberlist', {
                  url: '/b_memberlist',
                  templateUrl: 'tpl/b_memberlist.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/b_memberlist.js'] );
                      }]
                  }
              })

              //资源管理
              .state('source', {
                  abstract: true,
                  url: '/source',
                  templateUrl: 'tpl/c_layout.html'
              })
              .state('source.c_sourcelist', {
                  url: '/c_sourcelist',
                  templateUrl: 'tpl/c_sourcelist.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/c_sourcelist.js'] );
                      }]
                  }
              })
              .state('source.c_addsource', {
                  url: '/c_addsource',
                  templateUrl: 'tpl/c_addsource.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('ngImgCrop').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/c_addsource.js');
                              }
                          );
                      }]
                  }
              })
              .state('source.c_applysource', {
                  url: '/c_applysource/{SourceID}',
                  templateUrl: 'tpl/c_applysource.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/c_applysource.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })
                //我的资源详情
              .state('source.c_myapplysourcedetail', {
                  url: '/c_myapplysourcedetail/{ApplyID}',
                  templateUrl: 'tpl/c_myapplysourcedetail.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/c_myapplysourcedetail.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })
              //成员申请
              .state('source.c_memberapply', {
                  url: '/c_memberapply',
                  templateUrl: 'tpl/c_memberapply.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/c_memberapply.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })
              .state('source.c_modifysource', {
                  url: '/c_modifysource/{SourceID}',
                  templateUrl: 'tpl/c_modifysource.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/c_modifysource.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })
              .state('source.c_myapplysource', {
                  url: '/c_myapplysource',
                  templateUrl: 'tpl/c_myapplysource.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/c_myapplysource.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })

            //   共享中心
             .state('app.d_fileupload', {
                  url: '/d_fileupload',
                  templateUrl: 'tpl/d_fileupload.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/d_fileupload.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.d_sharefile', {
                  url: '/d_sharefile',
                  templateUrl: 'tpl/d_sharefile.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/d_sharefile.js');
                              }
                          );
                      }]
                  }
              })


                //消息中心
               .state('app.e_sendemail', {
                  url: '/e_sendemail',
                  templateUrl: 'tpl/e_sendemail.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('textAngular').then(
                                    function(){
                                        return $ocLazyLoad.load('js/controllers/e_sendemail.js');
                                    }
                                 );
                              }
                          );
                      }]
                  }
              })
              .state('app.e_emaillist', {
                  url: '/e_emaillist',
                  templateUrl: 'tpl/e_emaillist.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/e_emaillist.js']);
                    }]
                  }
              })
              .state('app.e_emailsdetail', {
                  url: '/e_emailsdetail/{EmailID}',
                  templateUrl: 'tpl/e_emailsdetail.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/e_emailsdetail.js']);
                    }]
                  }
              })

               //登录,注册等访问
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })   
              .state('access.z_signin', {
                  url: '/z_signin',
                  templateUrl: 'tpl/z_signin.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/z_signin.js']);
                    }]
                  }
              })
              .state('access.z_register', {
                  url: '/z_register',
                  templateUrl: 'tpl/z_register.html',
                  controller: 'RegisterFormController',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ui.select').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/z_register.js');
                              }
                          );
                      }]
                  }
              })
      }
    ]
  );