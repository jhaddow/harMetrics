/**
 * Created by jess.haddow on 12/21/15.
 */
(function () {
  'use strict';

  angular
    .module('harMetrics')
    .factory('DashboardService', DashboardService);

  DashboardService.$inject = ['$http'];
  /* @ngInject */
  function DashboardService($http)
  {
    var service = {
      getData: getData
    };
    return service;

    ////////////////

    function getData() {
      return $http.get('/api/getData')
        .then(function(data){
          //doSomething with data
          return data;
        });
    }
  }

})();

