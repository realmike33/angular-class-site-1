'use strict';
import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import Home from 'components/home/index';
import Common from 'components/common/index';
import Blog from 'components/blog/index';
import Admin from 'components/admin/index';
import ngSanitize from 'angular-sanitize';

function config($urlRouterProvider, $locationProvider, $mdThemingProvider){
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('yellow');
}

config.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider'];

angular.module('AngularClass', [
  'ngMaterial',
  'ngAria',
  'ngSanitize',
  'ngAnimate',
  'ui.router',
  Home.name,
  Common.name,
  Blog.name,
  Admin.name
])
.config(config);

export default {};
