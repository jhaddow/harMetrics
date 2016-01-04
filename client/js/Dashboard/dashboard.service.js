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
    var _data;

    var service = {
      readFile: readFile
    };
    return service;

    ////////////////

    function readFile(file) {
      var dfd = $q.defer();
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = JSON.parse(e.target.result);
        _data = createGridData(data.log.entries);
        var pieData = createPieData(_data.requests, 'Total Time');
        dfd.resolve({gridData: _data, pieData: pieData});
      };

      reader.onerror = function(e){
        dfd.reject(e.target.error);
      };

      reader.readAsText(file);

      return dfd.promise;
    }
  }



  function createGridData(data){
    var result = data.reduce(function(acc, item){
      acc.numReq++;
      acc.totalUpload += item.request.headersSize + item.request.bodySize;
      acc.totalDown += item.response._transferSize;
      acc.totalTime += item.time;
      acc.totaReceiveTime += item.timings.receive || 0;
      acc.totalWaitTime += item.timings.wait || 0;
      acc.totalSendTime += item.timings.send || 0;

      item.category = getCategory(item);
      item.reqSize = item.request.headersSize + item.request.bodySize;
      item.totalSize = item.reqSize + item.response._transferSize;
      item.displayTime = Math.round(item.time);
      acc.requests.push(item);

      return acc;
    }, {numReq: 0, totalUpload: 0, totalDown: 0, totalTime: 0, totalSendTime: 0, totalReceiveTime: 0, totalWaitTime: 0, requests: []});

    var startTime = moment(data[0].startedDateTime);
    var endTime = moment(data[data.length -1].startedDateTime).add(data[data.length - 1].time, 'ms');
    result.domLoadTime = Math.round(endTime.diff(startTime));
    return result;
  }

  function getCategory(item){
    var categories = ['image', 'css', 'font', 'json', 'javascript', 'html'];

    var category = _.find(categories, function(category) {
      return item.response.content.mimeType.indexOf(category) > -1;
    });

    return category || 'other';
  }

  function createPieData(data, targetField){
    var targetFieldMap = {
      'Total Time' : 'time',
      'Wait Time' : 'timings.wait',
      'Send Time' : 'timings.send',
      'Receive Time': 'timings.receive',
      'Total Size': 'totalSize',
      'Request Size': 'reqSize',
      'Response Size': 'response._transferSize'
    };

    var map = _.groupBy(data, 'category');
    var labels = [];
    var values = [];

    _.each(map, function(array, category){
      labels.push(category);
      var total = 0;
      _.each(array, function(item){
        total += _.get(item, targetFieldMap[targetField]);
      });
      values.push(Math.round(total));
    });

    return {labels: labels, data: values};
  }
})();

