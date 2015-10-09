(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimSandboxPerkDefinitions', dimSandboxPerkDefinitions);

    dimSandboxPerkDefinitions.$inject = ['$q', '$http'];

  function dimSandboxPerkDefinitions($q, $http) {
    var deferred = $q.defer();

    // $http.get('scripts/api-manifest/perks.json?v=3.1.2')
    //   .then(function(data) {
    //     deferred.resolve(data);
    //   },
    //   function(data) {
    //     deferred.reject(new Error('The sandbox perk definition file was not parsed correctly.'));
    //   })
    //   .catch(function() {
    //     return new Error('The sandbox perk definition file was not parsed correctly.');
    //   });

    self.port.on('sandbox-data', function(data) {
      console.log("Recieved sandbox Definitions from Index.js");
      deferred.resolve(data);
    });

    
    console.log("Requesting sandbox definition from index.js");
    self.port.emit("request-sandbox-definitions");

    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
