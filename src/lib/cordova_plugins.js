window.cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
        {
            "file": "plugins/cordova-plugin-device/www/device.js",
            "id": "cordova-plugin-device.device",
            "clobbers": [
                "device"
            ]
        },
        {
            "file": "plugins/cordova-plugin-dialogs/www/notification.js",
            "id": "cordova-plugin-dialogs.notification",
            "merges": [
                "navigator.notification"
            ]
        },
        {
            "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
            "id": "cordova-plugin-dialogs.notification_android",
            "merges": [
                "navigator.notification"
            ]
        },
        {
            "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
            "id": "cordova-plugin-splashscreen.SplashScreen",
            "clobbers": [
                "navigator.splashscreen"
            ]
        },
        {
            "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
            "id": "cordova-plugin-splashscreen.SplashScreen",
            "clobbers": [
                "navigator.splashscreen"
            ]
        },
        {
            "file": "plugins/cordova-plugin-fcm/www/FCMPlugin.js",
            "id": "cordova-plugin-fcm.FCMPlugin",
            "clobbers": [
                "FCMPlugin"
            ]
        }
    
    ];
    module.exports.metadata = 
    // TOP OF METADATA
    {
        "cordova-plugin-whitelist": "1.2.2",
        "cordova-plugin-device": "1.1.2",
        "cordova-plugin-dialogs": "1.2.1",
        "cordova-plugin-splashscreen": "3.2.2",
        "cordova-plugin-fcm": "2.1.1"
    
    }
    // BOTTOM OF METADATA
});