(function(angular) {
  'use strict';

  angular.module('dimApp')
    .factory('dimURLService', URLService);

    URLService.$inject = [];

   function URLService() {

   function getURL(url){
      if(!!window.chrome){
          return url;
        } else { //firefox
          var x = self.options.appUrl.substr(0, self.options.appUrl.lastIndexOf('/') + 1) + url;
          return x;
        }
   }

   return {
     'getURL': getURL
   };
  }
})(angular);
