(function() {
  'use strict';

  angular.module('dimApp')
    .factory('dimSettingsService', SettingsService);

  SettingsService.$inject = ['$q', '$rootScope', 'uuid2'];

  function SettingsService($q, $rootScope, uuid2) {
    var settingState;

    return {
      'getSetting': getSetting,
      'saveSetting': saveSetting
    };

    function loadSettings() {
      settingState = {
        hideFilteredItems: false,
        itemDetails: false,
        itemStat: false,
        condensed: false,
        characterOrder: 'mostRecent'
      };

      return $q(function(resolve, reject) {

        function processStorageSettings(data) {
          if (_.has(data, "settings-v1.0")) {
            resolve(data["settings-v1.0"]);
          } else {
            resolve({
              hideFilteredItems: false,
              condensed: false,
              characterOrder: 'mostRecent',
              itemDetails: false,
              itemStat: false
            });
          }
        }

        if (!!window.chrome) {
          chrome.storage.sync.get(null, processStorageSettings);
        } else { //firefox
          var settings = localStorage.getItem("settings-v1.0");
          if (settings) {
            resolve(settings);
          } else {
            resolve({
              hideFilteredItems: false,
              condensed: false,
              characterOrder: 'mostRecent',
              itemDetails: false,
              itemStat: false
            });
          }
        }
      });
    }

    function getSetting(key) {
      return loadSettings()
        .then(function(settings) {
          if (_.isUndefined(key)) {
            return settings;
          } else if (_.has(settings, key)) {
            return _.propertyOf(settings)(key);
          } else {
            return $q.reject("The key is not defined in the settings.");
          }
        });
    }

    function saveSetting(key, value) {
      return getSetting()
        .then(function(settings) {
          settings[key] = value;
          var data = {};
          var kvp = {};

          kvp[key] = value;

          data["settings-v1.0"] = settings;


          if (!!window.chrome) {

            chrome.storage.sync.set(data, function(e) {
              if (chrome.runtime.lastError) {
                $q.reject(chrome.runtime.lastError);
              } else {
                $rootScope.$broadcast('dim-settings-updated', kvp);
                return true;
              }
            });
          }
        });
    }
  }
})();