// Import the dependencides needed for the entry point.
import React from 'react';
import {AppRegistry, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';


function NewApp() {
    return <App />
}

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs([
    'Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.',
    ''
]);