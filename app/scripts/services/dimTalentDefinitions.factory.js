(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimTalentDefinitions', TalentDefinitions);

    TalentDefinitions.$inject = ['$q', '$timeout', '$http'];

  function TalentDefinitions($q, $timeout, $http) {
    var deferred = $q.defer();

    // $http.get('scripts/api-manifest/talent.json?v=3.1.12.1')
    //   .then(function(data) {
    //     deferred.resolve(data);
    //   },
    //   function(data) {
    //     deferred.reject(new Error('The talent definition file was not parsed correctly.'));
    //   })
    //   .catch(function() {
    //     return new Error('The talent definition file was not parsed correctly.');
    //   });

    self.port.on('talent-data', function(data) {
      console.log("Recieved talent Definitions from Index.js");
      deferred.resolve(data);
    });
    
    console.log("Requesting talent definition from index.js");
    self.port.emit("request-talent-definitions");


    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
