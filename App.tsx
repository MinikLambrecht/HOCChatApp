/**
 * React imports.
 */
import React, { useEffect, useState } from 'react';

/**
 * UI & Component imports.
 */
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

/**
 * Nagivation imports.
 */
import { AuthProvider } from './src/navigation/AuthProvider';
import SplashScreen from 'react-native-splash-screen'
import Routes from './src/navigation/Routes';

/**
 * Styling imports.
 */
import { useColorScheme } from 'react-native';
import * as theme from './theme.json';


/**
 * @fileoverview Root of the application.
 * @returns Returns the complete AppStack, with all screens, themes, contexts etc.
 */
export default function App() {
  /**
   * Theme states.
   */
  const [darkMode, setDarkMode] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  /**
   * Update theme based on user preferences.
   */
  useEffect(() => {
    SplashScreen.hide();
    setDarkMode(isDarkMode);
  }, []);

  
  /**
   * Merge the default Theme with the custom color palette.
   */
  const CustomTheme = darkMode === true ? {
    ...eva.dark, ...theme
  } : {
    ...eva.light, ...theme
  }

  return (
     <ApplicationProvider {...eva} theme={CustomTheme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ApplicationProvider>
  );
};


