/**
 * Created by jess.haddow on 12/21/15.
 */
(function () {
  'use strict';

  angular
    .module('harMetrics', [
      'ng-route'
    ]).config(config);

  config.$inject = ['$routeProvider'];

  /* @ngInject */
  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/',
        controller: 'DashboardCtrl',
        controllerAs: 'vm'
      });
  }

})();