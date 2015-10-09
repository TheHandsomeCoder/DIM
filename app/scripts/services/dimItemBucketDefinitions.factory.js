(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimItemBucketDefinitions', ItemBucketDefinitions);

  ItemBucketDefinitions.$inject = ['$q', '$timeout', '$http'];

  function ItemBucketDefinitions($q, $timeout, $http) {
    var deferred = $q.defer();

    // $http.get('scripts/api-manifest/buckets.json?v=3.1.12.1')
    //   .success(function(data) {
    //     deferred.resolve(data);
    //   })
    //   .error(function(data) {
    //     deferred.reject(new Error('The item buckets definition file was not parsed correctly.'));
    //   });
    
    self.port.on('bucket-data', function(data) {
      console.log("Recieved bucket Definitions from Index.js");
    });
    
    console.log("Requesting bucket definition from index.js");
    self.port.emit("request-bucket-definitions");


    return {
      'getDefinitions': function() { return deferred.promise; }
    };
  }
})(angular);
