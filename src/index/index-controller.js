
angular
.module('ngManager')
.controller('IndexCtrl', function($scope, $rootScope, $materialSidenav, $timeout, $interval, $translate, $translateLoader) {

  $scope.toggleMenu = function() {
    $timeout(function() {
      $materialSidenav('left').toggle();
    });
  };

  $scope.site = { title: 'NG-Manager' };

  $scope.head = {};

  $scope.moveTo = function(path) {
    location.hash = path;
    $materialSidenav('left').toggle();
  };

  $rootScope.$on('content.title', function(evt, title) {
    $scope.head.title = title;
  });

  $rootScope.$on('progress.start', function() {
    $scope.progress = { mode: 'indeterminate', value: 0 };
  });

  $rootScope.$on('progress.end', function() {
    var progress = $scope.progress;
    if (progress.mode === 'indeterminate') {
      progress.mode = 'determinate';
      progress.value = 0;
    }
    var p = $interval(function() {
      progress.value += 20;
      if (progress.value >= 100) {
        $interval.cancel(p);
        $timeout(function() {
          delete $scope.progress;
        }, 200);
      }
    }, 50);
  });

  $rootScope.$on('config', function(evt, config) {
    console.info('Loaded configuration', config);
    $scope.config = config;
    $scope.site = config.site;

    if (config.i18n) {
      $translateLoader.addTables(config.i18n);
      $translate.refresh();
    }
  });

});