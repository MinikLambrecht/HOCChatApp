/**
 * React Imports.
 */
import React, { useState } from 'react';

/**
 * Navigation Imports.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/**
 * Screen Imports.
 */
import Chats from '../screens/ChatsScreen';
import * as Screen from '../screens';

/**
 * Icon Imports
 */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Type Imports.
 */
import { RootStackParamList } from '../types';

/**
 * Style Imports.
 */
import * as Styling from '../styles';
import { useTheme, Modal, Text, Card, Button } from '@ui-kitten/components';

/** 
 * Model Imports.
 */
import { ChatModel } from '../models/Chats';
import { UserModel } from '../models/User';
import { auth } from '../firebase/firebase';

/**
 * Create a new native stack navigation, for navigating between the screens.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


/**
 * 
 * @returns Complete Nagivation stack.
 */
export default function AppStack() {
    const [user, setUser] = useState<UserModel>();
    const [visible, setVisible] = React.useState(false);

    const theme = useTheme();
    const styles = Styling.AppStyles;

    const currUser = auth.currentUser;

    return (
        <>
            <Stack.Navigator
                initialRouteName={user ? 'Chats' : 'Login'}
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
                        name='Chats'
                        options={{
                            title: 'Chats',
                            headerLeft: () => (
                                <Icon 
                                    size={25}
                                    color={theme['color-danger-700']}
                                    name='logout'
                                    onPress={() => {
                                        auth.signOut();
                                    }}
                                />
                            ),
                            headerRight: () => (
                                <Icon
                                    size={25}
                                    color={theme['color-success-700']}
                                    name='plus'
                                    onPress={() => setVisible(true)}
                                />
                            ),
                        }}
                    >
                        {props => <Chats {...props} Navigation={null}  User={user} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name='Signup'
                        component={Screen.Signup}
                        options={{
                            title: 'Sign Up'
                        }}
                    />
                    <Stack.Screen
                        name='Login'
                        component={Screen.Login}
                        options={{
                            title: 'Log In',
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
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}
            >
                <Card disabled={true}>
                <Text >Current user</Text>

                <Text>
                    Email: {currUser?.email}
                </Text>
                <Text>
                    UID: {currUser?.uid}
                </Text>

                <Button onPress={() => setVisible(false)}>
                    DISMISS
                </Button>
                </Card>
            </Modal>
        </>
    )
}