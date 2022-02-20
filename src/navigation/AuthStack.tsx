/**
 * React Imports.
 */
import React from 'react';

/**
 * Navigation Imports.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/**
 * Screen Imports.
 */
import * as Screens from '../screens';

/**
 * Create a new navigation stack, based on authentication.
 */
const Stack = createNativeStackNavigator();

/**
 * Styling Imports.
 */
import { useTheme } from '@ui-kitten/components';


/**
 * 
 * @returns Navigation stack for unauthencticated users.
 */
export default function AuthStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme['color-primary-700'],
        },
        headerTintColor: theme['color-basic-400'],
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen
          name='Signup'
          component={Screens.Signup}
          options={{
            title: 'Sign Up'
          }}
        />
        <Stack.Screen
          name='Login'
          component={Screens.Login}
          options={{
            title: 'Log In'
          }}
        />
      </Stack.Navigator>
  );
}