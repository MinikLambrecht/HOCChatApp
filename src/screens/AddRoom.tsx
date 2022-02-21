/**
 * React Imports.
 */
import React, { useState } from 'react';

/**
 * UI & Component Imports.
 */
import { Button, Input, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import { View } from 'react-native';

/**
 * Firebase Imports.
 */
import firestore from '@react-native-firebase/firestore';

/**
 * Styling Imports.
 */
import * as Styling from '../styles';

/**
 * Type Imports.
 */
import { AddRoomScreenProps } from '../types';

/**
 * Icon Imports.
 */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


/**
 * 
 * @param props Navigation props.
 * @returns Add Room modal.
 */
export const AddRoom: React.FC<AddRoomScreenProps> = (props) => {
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const styles = useStyleSheet(Styling.AddRoomStyles);
    const theme = useTheme();

    /**
     * Create a new Firestore collection to save threads
     */
    function handleButtonPress() {
        if (roomName.length > 0)
        {
            firestore()
                .collection('THREADS')
                .add({
                    name: roomName,
                    description: roomDescription,
                    latestMessage: {
                        text: `You have joined the room ${roomName}.`,
                        createdAt: new Date().getTime()
                    }
                })
                .then(docRef => {
                    docRef.collection('MESSAGES').add({
                        text: `You have joined the room ${roomName}.`,
                        createdAt: new Date().getTime(),
                        system: true
                    });
                    props.navigation.navigate('Home');
            });
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.closeButtonContainer}>
                <Icon 
                    name='close'
                    size={32}
                    color={theme['color-danger-500']}
                    onPress={() => props.navigation.goBack()} 
                />
            </View>
            <View style={styles.innerContainer}>
                <Text category='h2' style={styles.title}>
                    Create a new chat room
                </Text>

                <Input
                    placeholder='Room Name'
                    style={styles.input}
                    value={roomName}
                    onChangeText={text => setRoomName(text)}
                    clearButtonMode='while-editing'
                />

                <Input
                    placeholder='Room Description'
                    style={styles.input}
                    value={roomDescription}
                    onChangeText={text => setRoomDescription(text)}
                    clearButtonMode='while-editing'
                />

                <Button
                    appearance='outline'
                    status='warning'
                    style={styles.buttonLabel}
                    onPress={() => handleButtonPress()}
                    disabled={
                        roomName.length === 0 ? true : false ||
                        roomDescription.length === 0 ? true : false
                    }
                >
                    Create
                </Button>
             </View>
        </View>
    );
}