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

    activate();

    ////////////////

    function activate() {
      DashboardService.getData()
        .then(function(data){
          vm.data = data;
        })
    }
  }

})();

