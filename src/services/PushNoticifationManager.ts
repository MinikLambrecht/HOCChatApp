
/**
 * React Imports.
 */
import React from 'react';

/**
 * Push notification functionality Imports.
 */
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';


/**
 * Configure the Push Notification library.
 * @class
 */
class PushNotificationManager {
  initialize(): void {
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token.token);
      },
      
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        
        // Called when a remote is received or opened, or local notification is opened.
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Whether the library should pop the first notification when the app starts.
      popInitialNotification: false,

      // Requestion permissions on startup.
      requestPermissions: true,
    });
  }
}

const NotificationManager = new PushNotificationManager()

// Singleton that everything must reference to communicate with notifications
export default NotificationManager