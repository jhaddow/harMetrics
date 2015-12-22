/**
 * Created by jess.haddow on 12/21/15.
 */
(function () {
  'use strict';

  angular
    .module('harMetrics')
    .controller('MainCtrl', MainCtrl);

  //MainCtrl.$inject = [];

  /* @ngInject */
  function MainCtrl() {
    var vm = this;
    vm.title = 'MainCtrl';

    activate();

    ////////////////

    function activate() {
      //I may do something here.
    }
  }

})();

