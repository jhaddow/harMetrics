(function () {
  'use strict';

  angular
    .module('harMetrics')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$timeout', 'DashboardService'];

  /* @ngInject */
  function DashboardCtrl($timeout, DashboardService) {
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
    vm.uploadFile = uploadFile;
    var fileGrab = document.querySelector('input[id=fileGrab]');
    fileGrab.onchange = fileGrabOnChange;


    //activate();

    ////////////////

    function activate() {
      DashboardService.getData()
        .then(function(data){
          vm.data = data;
          vm.gridOptions.data = data.requests;
        })
    }

    function fileGrabOnChange () {
      processData(fileGrab);
    }

    function uploadFile (){
      $timeout(function(){
        fileGrab.click();
      });
    }

    function processData(fileGrab){
      if(!fileGrab.files.length){
        return;
      }

      DashboardService.readFile(fileGrab.files[0])
        .then(function(data){
          vm.data = data;
          vm.gridOptions.data = data.requests;
          console.log(data);
        })
    }

  }

})();

