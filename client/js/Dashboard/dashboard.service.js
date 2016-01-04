/**
 * Created by jess.haddow on 12/21/15.
 */
(function () {
  'use strict';

  angular
    .module('harMetrics')
    .factory('DashboardService', DashboardService);

  DashboardService.$inject = ['$http', '$q'];
  /* @ngInject */
  function DashboardService($http, $q)
  {
    var service = {
      getData: getData,
      readFile: readFile
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

    function readFile(file) {
      var dfd = $q.defer();
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = JSON.parse(e.target.result);
        dfd.resolve(transFormData(data.log.entries));
      };

      reader.onerror = function(e){
        dfd.reject(e.target.error);
      };

      reader.readAsText(file);

      return dfd.promise;
    }
  }



  function transFormData(data){
    var result = data.reduce(function(accumulator, item){
      accumulator.numReq++
      accumulator.totalUpload += item.request.headersSize;
      accumulator.totalDown += item.response._transferSize;
      accumulator.totalTime2 += item.time;

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
    }, {numReq: 0, totalUpload: 0, totalDown: 0, totalTime2: 0, requests: []});

    var startTime = moment(data[0].startedDateTime);
    var endTime = moment(data[data.length -1].startedDateTime).add(data[data.length - 1].time, 'ms');
    result.totalTime = endTime.diff(startTime);
    return result;
  }
})();

