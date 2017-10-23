 (function(window) {
  var IDFVPlugin = function() {
  
  }
  
  IDFVPlugin.prototype = {
  
    getIdentifier: function(callback, errCallbac) {
        window.cordova.exec(callback, errCallbac, "IDFVPlugin", "getIdentifier",[]);
    }
  };
  
  window.cordova.addConstructor(function() {
    window.IDFVPlugin = new IDFVPlugin();
  });
  
})(window);
