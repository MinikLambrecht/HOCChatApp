/**
 * React Imports.
 */
import React from 'react';
import {AppRegistry, LogBox } from 'react-native';

/**
 * Entry point.
 */
import App from './App';

/**
 * App Information.
 */
import {name as appName} from './app.json';

/**
 * Push notification Imports.
 */
import NotificationManager from './src/services/PushNoticifationManager';

/**
 * 
 * @returns Appl.tsx as the entry point.
 */
function NewApp() {
    return <App />
}

NotificationManager.initialize();
AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs([
    'Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.',
    ''
]);