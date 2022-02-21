/**
 * React Imports.
 */
import React, { useContext, useState } from 'react';


/**
 * Navigation Imports.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/**
 * Icon Imports.
 */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Screen Imports.
 */
import * as Screens from '../screens';

/** 
 * Authentication Imports.
 */
import { AuthContext } from './AuthProvider';

/**
 * Type Imports.
 */
import { HomeScreenProps } from '../types';
import { useTheme } from '@ui-kitten/components';
import { Alert, View } from 'react-native';

import PushNotification from 'react-native-push-notification';

/**
 * Create a new navigation stack, based on the chat screen,
 * plus extended functionality.
 */
const ChatAppStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();


/**
 * 
 * @param props Navigation Props.
 * @returns Chat Screen.
 */
const ChatApp: React.FC<HomeScreenProps> = (props) => {
  const logout = useContext(AuthContext)?.logout;
  const theme = useTheme();

  const [subscribed, setSubscribed] = useState<any | undefined>(false);
  

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: theme['color-primary-700'],
        },
        headerTintColor: theme['color-basic-400'],
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }}>

      <ChatAppStack.Screen
        name='Home'
        component={Screens.Home}
        options={() => ({
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              name='chat-plus-outline'
              size={28}
              color={theme['color-success-500']}
              onPress={() => props.navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <Icon
              name='logout'
              size={28}
              color={theme['color-danger-500']}
              onPress={() => {
                logout();
              }}
            />
          )
        })}
      />

      <ChatAppStack.Screen
        name='ChatRoom'
        component={Screens.Room}
        options={({ route }) => ({
           headerRight: () => (
             
            <View style={{flexDirection:'row'}}>
              <Icon
                name={subscribed === true ? 'bell' : 'bell-off'}
                size={28}
                color={theme['color-basic-500']}
                onPress={async () => {
                  try
                  {
                    setSubscribed(!subscribed)
                    const topic = 'test';

                    // Todo: test it, after notifications are fully implemented.
                    switch(subscribed)
                    {
                      case true:
                        PushNotification.unsubscribeFromTopic(topic);
                        console.log(`Unsubscribed to topic: ${topic}`);
                      break;

                      case false:
                        PushNotification.subscribeToTopic('test');
                        console.log(`Subscribed to topic: ${topic}`);
                      break;
                    }
                  }
                  catch(e)
                  {
                    Alert.alert(
                      'Unexpected error',
                      `And unexpected error has occured\n${e}`
                    );
                  }
                  
                }}
              />
            </View>

          ),
          headerTitleAlign: 'center',
          title: route.params?.thread.name,
        })}
      />

    </ChatAppStack.Navigator>
  );
}


/**
 * 
 * @returns Navigation stack for authencticated users.
 */
export default function HomeStack() {
  return (
    <ModalStack.Navigator screenOptions={{ headerShown: false }}>
      <ModalStack.Screen name='ChatApp' component={ChatApp} />
      <ModalStack.Screen name='AddRoom' component={Screens.AddRoom} />
    </ModalStack.Navigator>
  );
}