(function () {
  'use strict';

  angular
    .module('harMetrics')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['DashboardService'];

  /* @ngInject */
  function DashboardCtrl(DashboardService) {
    var vm = this;
    vm.title = 'DashboardCtrl';
    vm.columns = [
      {field: 'method', title: 'Method', width: 90},
      {field: 'request', title: 'Request'},
      {field: 'response', title: 'Response', width: 90},
      {field: 'reqSize', title: 'Req. Size', width: 90},
      {field: 'resSize', title: 'Res. Size', width: 90},
      {field: 'totalTime', title: 'Total Time', width: 90}
    ];
    vm.gridOptions = {
      columnDefs: vm.columns,
    };
    activate();

    ////////////////

    function activate() {
      DashboardService.getData()
        .then(function(data){
          vm.data = data;
          vm.gridOptions.data = data.requests;
        })
    }
  }

})();

