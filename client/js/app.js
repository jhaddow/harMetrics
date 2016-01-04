/**
 * Created by jess.haddow on 12/21/15.
 */
(function () {
  'use strict';

  angular
    .module('harMetrics', [
      'ngRoute',
      'ui.grid',
      'chart.js',
      'ngMaterial'
    ]).config(config);

  config.$inject = ['$routeProvider'];

  /* @ngInject */
  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/Dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      });
  }

})();