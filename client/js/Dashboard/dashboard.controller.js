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

    vm.fileUploaded = false;
    vm.showPieChart = true;
    vm.togglePieChart = togglePieChart;

    vm.calcPercentagesList = ['Total Time', 'Wait Time', 'Send Time', 'Receive Time', 'Total Size', 'Request Size', 'Response Size'];
    vm.calcPercentages = calcPercentages;

    vm.categoryList =  ['all', 'image', 'css', 'font', 'json', 'javascript', 'html', 'other'];
    vm.filterCategory = filterCategory;

    //ui-grid column definitions
    vm.columns = [
      {field: 'request.method', displayName: 'Method', width: 90},
      {field: 'request.url', displayName: 'Request'},
      {field: 'response.status', displayName: 'Response', width: 90},
      {field: 'reqSize', displayName: 'Req. Size', width: 90},
      {field: 'response._transferSize', displayName: 'Res. Size', width: 90},
      {field: 'displayTime', displayName: 'Time (ms)', width: 90}
    ];

    vm.gridOptions = {
      columnDefs: vm.columns
    };

    //for uploading a file
    vm.uploadFile = uploadFile;
    var fileGrab = document.querySelector('input[id=fileGrab]');
    fileGrab.onchange = fileGrabOnChange;

    //////////////////////////////////////

    function togglePieChart(){
      vm.showPieChart = !vm.showPieChart;
    }

    function calcPercentages(targetField){
      vm.pieData = DashboardService.calcPercentages(targetField);
    }

    function filterCategory(category){
      vm.data = DashboardService.filterCategory(category);
      vm.gridOptions.data = vm.data.requests;
    }

    function fileGrabOnChange () {
      processData(fileGrab);
    }

    function uploadFile (){
      $timeout(function(){
        fileGrab.click();
      }, 300);
    }

    function processData(fileGrab){
      if(!fileGrab.files.length){
        return;
      }

      DashboardService.readFile(fileGrab.files[0])
        .then(function(data){
          vm.fileUploaded = true;
          vm.data = data.gridData;
          vm.gridOptions.data = data.gridData.requests;
          vm.pieData = data.pieData;
          console.log(data);
        })
    }



  }

})();

