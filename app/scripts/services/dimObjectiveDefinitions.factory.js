(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimObjectiveDefinitions', ObjectiveDefinitions);

  ObjectiveDefinitions.$inject = ['$q', '$timeout', '$http', 'dimURLService'];

  function ObjectiveDefinitions($q, $timeout, $http, dimURLService) {
    var deferred = $q.defer();

    $http.get(dimURLService.getURL('scripts/api-manifest/objectives.json?v=3.1.12.2'))
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject(new Error('The items definition file was not parsed correctly.'));
    });


    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
