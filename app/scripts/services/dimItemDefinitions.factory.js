(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimItemDefinitions', ItemDefinitions);

  ItemDefinitions.$inject = ['$q', '$timeout', '$http'];

  function ItemDefinitions($q, $timeout, $http) {
    var deferred = $q.defer();

    // $http.get('scripts/api-manifest/items.json?v=3.1.2')
    //   .success(function(data) {
    //     deferred.resolve(data);
    //   })
    //   .error(function(data) {
    //     deferred.reject(new Error('The items definition file was not parsed correctly.'));
    //   });

    self.port.on('item-data', function(data) {
      console.log("Recieved Item Definitions from Index.js");
      deferred.resolve(data);
    });
    console.log("Requesting item definition from index.js");
    self.port.emit("request-item-definitions");

    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
