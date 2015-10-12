(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimSandboxPerkDefinitions', dimSandboxPerkDefinitions);

    dimSandboxPerkDefinitions.$inject = ['$q', '$http', 'dimURLService'];

  function dimSandboxPerkDefinitions($q, $http, dimURLService) {
    var deferred = $q.defer();


    $http.get(dimURLService.getURL('scripts/api-manifest/perks.json?v=3.1.12.2'))
      .then(function(data) {
        deferred.resolve(data);
      },
      function(data) {
        deferred.reject(new Error('The sandbox perk definition file was not parsed correctly.'));
      })
      .catch(function() {
        return new Error('The sandbox perk definition file was not parsed correctly.');
      });


    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
