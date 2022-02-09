/**
 * React imports.
 */
import React, { FC, useEffect, useState } from 'react';

/**
 * UI & Component imports.
 */
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

/**
 * Model imports.
 */

import { ChatModel } from './src/models/Chats';

/**
 * Nagivation imports.
 */
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './src/components/StackNavigation';
import SplashScreen from 'react-native-splash-screen'

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
 * Context Variables.
 */
  const Chats: ChatModel[] = [{
    RoomName: 'Default Room',
    Description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit neque sunt harum minima, totam ab!'
  }]

  /**
   * Context states.
   */
  const [ chats, setChats ] = useState(Chats);

  /**
   * Update theme based on user preferences.
   */
  useEffect(() => {
    SplashScreen.hide();
    setDarkMode(isDarkMode);
  },[]);

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
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ApplicationProvider>
  );
};


