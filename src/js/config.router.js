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
              .otherwise('/app/a_shownews');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })


              //资讯平台
              .state('app.a_shownews', {
                  url: '/a_shownews',
                  templateUrl: 'tpl/a_shownews.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/a_shownews.js']);
                    }]
                  }
              })
              .state('app.a_sendnews', {
                  url: '/a_sendnews',
                  templateUrl: 'tpl/a_sendnews.html'
              })


               //登录等访问
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
      }
    ]
  );