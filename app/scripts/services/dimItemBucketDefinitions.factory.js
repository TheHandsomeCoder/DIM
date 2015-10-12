(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimItemBucketDefinitions', ItemBucketDefinitions);

  ItemBucketDefinitions.$inject = ['$q', '$timeout', '$http', 'dimURLService'];

  function ItemBucketDefinitions($q, $timeout, $http, dimURLService) {
    var deferred = $q.defer();
   
    $http.get(dimURLService.getURL('scripts/api-manifest/buckets.json?v=3.1.12.2'))
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject(new Error('The item buckets definition file was not parsed correctly.'));
      });

    return {
      'getDefinitions': function() {         
        return deferred.promise; 
      }
    };
  }
})(angular);
