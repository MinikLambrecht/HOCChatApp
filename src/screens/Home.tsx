/**
 * Root Imports.
 */
import React, { useState, useEffect } from 'react';

/**
 * UI & Component imports.
 */
import { TouchableOpacity } from 'react-native';
import { List, ListItem, Text, useStyleSheet, useTheme } from '@ui-kitten/components';
import Loading from '../components/Loading';

/**
 * Icon Imports.
 */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Type Imports
 */
import { ChatRoom, HomeScreenProps } from '../types';

/**
 * Style Imports.
 */
import * as Styling from '../styles';

/**
 * Authentication Imports.
 */
import firestore from '@react-native-firebase/firestore';


/**
 * 
 * @param props Navigation props
 * @returns Chats Screen
 */
export const Home: React.FC<HomeScreenProps> = (props) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = useStyleSheet(Styling.HomeStyles);
  const theme = useTheme();

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            description: '',
            latestMessage: {
                text: '',
                createdAt: new Date().getTime()
            },
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <List
        style={styles.container}
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
            <TouchableOpacity>
                <ListItem
                  style={styles.ListItem}
                  onPress={() => props.navigation.navigate('ChatRoom', { thread: item })}
                  accessoryRight={<Icon size={28} color={theme['color-success-400']} name='chevron-right' />}
                  title={
                      <Text category='h1'>
                          {item.name}
                      </Text>
                  }
                  description={item.description}
                />
            </TouchableOpacity>
        )}
    />
  );
};