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
                //   resolve: {
                //     deps: ['$ocLazyLoad',
                //       function( $ocLazyLoad ){
                //         return $ocLazyLoad.load(['js/controllers/chart.js']);
                //     }]
                //   }
              })
              .state('app.a_sendnews', {
                  url: '/a_sendnews',
                  templateUrl: 'tpl/a_sendnews.html'
              })




              .state('app.z_signin', {
                  url: '/z_signin',
                  templateUrl: 'tpl/z_signin.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/z_signin.js']);
                    }]
                  }
              })



              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ngGrid').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/grid.js');
                              }
                          );
                      }]
                  }
              })
      }
    ]
  );