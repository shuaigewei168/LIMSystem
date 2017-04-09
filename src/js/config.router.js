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
            //   .state('app.a_sendnews', {
            //       url: '/a_sendnews',
            //       templateUrl: 'tpl/a_sendnews.html'
            //   })


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