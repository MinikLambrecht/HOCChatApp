// Import the dependencides needed for the entry point.
import React, { useState } from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import ErrorHandler from './src/components/ErrorHandling';

function NewApp() {
    return (
        <ErrorHandler>
            <App />
        </ErrorHandler>
    )
}

AppRegistry.registerComponent(appName, () => App);