// import root functionality.
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Import screens & components.
import * as Screen from '../screens';
import { useTheme } from '@ui-kitten/components';

// Import icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../types';

// Create a new native stack navigation, for navigating between the screens.
const Stack = createNativeStackNavigator<RootStackParamList>();

import * as Styling from '../styles';

import { ChatModel} from '../models/Chats';

export default function AppStack() {
    const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(testUser);

    const theme = useTheme();

    return (
        <Stack.Navigator
            initialRouteName={'Chats'}
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
            <Stack.Screen
                name='Signup'
                component={Screen.Signup}
                options={{
                    title: 'Signup'
                }}
            />
            <Stack.Screen
                name='Login'
                component={Screen.Login}
                options={{
                    title: 'Login',
                }}
            />
           <Stack.Screen
                name='Chats'
                component={Screen.Chats}
                options={{
                    title: 'Chats',
                    headerLeft: () => (
                        <Icon 
                            size={25}
                            color={theme['color-danger-700']}
                            name='logout'
                        />
                    ),
                    headerRight: () => (
                        <Icon 
                            size={25}
                            color={theme['color-success-700']}
                            name='plus'
                            
                        />
                    ),
                }}
            />
            <Stack.Screen
                name='ChatRooms'
                component={Screen.Chatroom}
                options={{
                    title: 'Chatroom'
                }}
            />
        </Stack.Navigator>
    )
}