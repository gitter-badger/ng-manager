angular
.module('ngManager')
.controller('EntityCtrl', function(
  $scope,
  $routeParams,
  $rootScope,
  $schemaForm,
  $entityService,
  $errorService,
  $window) {

    var kind = $routeParams.kind;

    console.info('Entity', kind);

    $rootScope.$emit('content.title', {
      section: 'Entities',
      page: kind
    });

    $scope.list = function() {
      $entityService.list({
        kind: kind
      }).then(function(data) {

        $scope.fields = data.fields;
        $scope.rows = data.list;

        // update size after applying list
        setTimeout(resize, 0);

      }, function(err) {
        $errorService.showError(err);
      });
    };

    var resize = function() {
      var body = document.getElementById('entity-table-body');
      var rect = body.getBoundingClientRect();
      // get body height
      var th = Math.floor($window.innerHeight - rect.top);
      body.style.height = th + 'px';
    };

    $scope.$on('window.resize', resize);

    $scope.list();

})
;

