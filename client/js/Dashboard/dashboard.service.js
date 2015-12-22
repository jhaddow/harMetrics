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
          //doSomething
          return transFormData(data.data);
        });
    }
  }

  function transFormData(data){
    var result = data.reduce(function(accumulator, item){
      accumulator.numReq++
      accumulator.totalUpload += item.request.headersSize;
      accumulator.totalDown += item.response._transferSize;

      var obj = {
        method: item.request.method,
        request: item.request.url,
        reqSize: item.request.headersSize,
        response: item.response.status,
        resSize: item.response._transferSize,
        totalTime: Math.round(item.time) + ' ms'
      };
      accumulator.requests.push(obj);

      return accumulator;
    }, {numReq: 0, totalUpload: 0, totalDown: 0, requests: []});

    var startTime = moment(data[0].startedDateTime);
    var endTime = moment(data[data.length -1].startedDateTime).add(data[data.length - 1].time, 'ms');
    result.totalTime = endTime.diff(startTime);
    return result;
  }
})();

