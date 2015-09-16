var tabs = require("sdk/tabs");
var pagemod = require("sdk/page-mod");
var pageurl = require("sdk/self").data.url("app/index.html");
var data = require("sdk/self").data;


function getBungieCookies(){
  console.log("Recieved Cookie Request");
  var {Cc, Ci} = require("chrome");
  var cookieValue = "", cookieMgr = Cc["@mozilla.org/cookiemanager;1"].getService(Ci.nsICookieManager);
  for (var e = cookieMgr.enumerator; e.hasMoreElements();) {
    var cookie = e.getNext().QueryInterface(Ci.nsICookie);
    if (cookie.host.indexOf("bungie.net") > -1){
    if (cookie.name == "bungled"){
      cookieValue = cookie.value;
    } 
    } 
  }
  return cookieValue;
}

tabs.on('ready', function(tab) {
  if(tab.url.indexOf(pageurl) === -1) return;



 
  worker = tab.attach({ //TODO: Find a more elegent way of passing the cookie to the extention. This only works if the cookie already exists.
        
  contentScriptFile: [  
  data.url("app/vendor/jquery/dist/jquery.min.js"),
  data.url("app/vendor/angular/angular.min.js"),
  data.url("app/vendor/angular-ui-router/release/angular-ui-router.min.js"),
  data.url("app/vendor/angular-animate/angular-animate.min.js"),
  data.url("app/scripts/toaster.js"),
  data.url("app/vendor/angular-native-dragdrop/draganddrop.js"),
  data.url("app/vendor/ngDialog/js/ngDialog.min.js"),
  data.url("app/vendor/Angular.uuid2/dist/angular-uuid2.min.js"),
  data.url("app/vendor/underscore/underscore-min.js"),
  data.url("app/vendor/lz-string/libs/lz-string.min.js"),
  data.url("app/vendor/angular-chrome-storage/angular-chrome-storage.js"),
  data.url("app/vendor/angular-messages/angular-messages.min.js"),
  data.url("app/vendor/angular-promise-tracker/promise-tracker.js"),
  data.url("app/vendor/verge/verge.js" ), 
  data.url("app/scripts/ScrollToFixed.js"),
  data.url("app/vendor/angular-chrome-storage/angular-chrome-storage.js"),
  data.url("app/vendor/angular-cookies/angular-cookies.js"),
  data.url("app/vendor/angular-hotkeys/build/hotkeys.js"), 
  data.url("app/scripts/dimApp.module.js"),
  data.url("app/scripts/dimApp.config.js"),
  data.url("app/scripts/services/dimRateLimit.factory.js"),
  data.url("app/scripts/services/dimBungieService.factory.js"),
  data.url("app/scripts/services/dimItemDefinitions.factory.js"),
  data.url("app/scripts/services/dimTalentDefinitions.factory.js"),
  data.url("app/scripts/services/dimPlatformService.factory.js"),
  data.url("app/scripts/services/dimLoadoutService.factory.js"),
  data.url("app/scripts/services/dimSettingsService.factory.js"),
  data.url("app/scripts/services/dimStoreService.factory.js"),
  data.url("app/scripts/services/dimItemService.factory.js"),
  data.url("app/scripts/loadout/dimLoadout.directive.js"),
  data.url("app/scripts/loadout/dimLoadoutPopup.directive.js"),
  data.url("app/scripts/shell/dimAppCtrl.controller.js"),
  data.url("app/scripts/shell/dimSettingsCtrl.controller.js"),
  data.url("app/scripts/shell/dimPlatformChoice.directive.js"),
  data.url("app/scripts/shell/dimSearchFilter.directive.js"),
  data.url("app/scripts/shell/dimClickAnywhereButHere.directive.js"),
  data.url("app/scripts/store/dimStores.directive.js"),
  data.url("app/scripts/store/dimStoreItems.directive.js"),
  data.url("app/scripts/store/dimStoreItem.directive.js"),
  data.url("app/scripts/store/dimStoreHeading.directive.js"),
  data.url("app/scripts/move-popup/dimMovePopup.directive.js"),
  data.url("app/scripts/move-popup/dimMoveItemProperties.directive.js"),
  data.url("app/scripts/google.js")]
  });
  worker.port.on("request-cookie", function(){
      console.log("index.js received cookie request");
      worker.port.emit("response-cookie", getBungieCookies());
    });
});

require("sdk/ui/button/action").ActionButton({
  id: "dim",
  label: "Destiny Item Manaer",
  icon: {
    "16": "./app/favicon-16x16.png",
    "32": "./app/favicon-16x16.png",
    "64": "./app/favicon-16x16.png"
  },
  onClick: function() {
    for(var i in tabs) {
      if(tabs[i].url.indexOf(pageurl) !== -1) {
        tabs[i].activate();
        return;
      }
    }
    tabs.open('app/index.html');
  }
});
