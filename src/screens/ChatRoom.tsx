/**
 * React Imports.
 */
import React, { useState, useContext, useEffect } from 'react';

/**
 * UI & Component Imports.
 */
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  IMessage,
  User,
  InputToolbar
} from 'react-native-gifted-chat';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { Button, Input, Text, useStyleSheet } from '@ui-kitten/components';

/**
 * Firebase Imports.
 */
import firestore from '@react-native-firebase/firestore';

/**
 * Styling Imports.
 */
import * as Styling from '../styles';
import { useTheme } from '@react-navigation/native';

/**
 * Icon Imports
 */
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Type Imports.
 */
import { ChatRoomsScreenProps } from '../types';

import { ChatRoom } from '../types';

export const Room:React.FC<ChatRoomsScreenProps> = (props) => {
    const styles = useStyleSheet(Styling.ChatroomStyle);
    const theme = useTheme();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const { thread } = props.route.params;
    const currentUser = useContext(AuthContext)?.user;

    async function handleSend(messages: IMessage[]) {
      const text = messages[0].text;

      firestore()
        .collection('THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
          text,
          createdAt: new Date().getTime(),
          user: {
            _id: currentUser?.uid,
            email: currentUser?.email,
            avatar: currentUser?.photoURL
          }
        });

      await firestore()
        .collection('THREADS')
        .doc(thread._id)
        .set(
          {
            latestMessage: {
              text,
              createdAt: new Date().getTime()
            }
          },
          { merge: true }
        );
    }

    useEffect(() => {
      const messagesListener = firestore()
        .collection('THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
          const msgs = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();

            const data: IMessage = {
              _id: doc.id,
              text: '',
              createdAt: new Date().getTime(),
              user: firebaseData.user,
              ...firebaseData
            };

            if (!firebaseData.system) {
              data.user = {
                ...firebaseData.user,
                name: firebaseData.user.email
              };
            }

            return data;
          });

          setMessages(msgs);
        });

      // Stop listening for updates whenever the component unmounts
      return () => messagesListener();
    }, []);

    function renderBubble(props: any) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#005BAE'
            },
            left: {
              backgroundColor: 'white'
            }
          }}
          textStyle={{
            right: {
              color: 'white'
            },
            left: {
              color: 'black'
            }
          }}
        />
      );
    }

    function renderLoading() {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#6646ee' />
        </View>
      );
    }

    function scrollToBottomComponent() {
      return (
        <View style={styles.bottomComponentContainer}>
          <Icon name='chevron-down' style={styles.bottomComponentIcon} size={40} />
        </View>
      );
    }

    function renderSystemMessage(props: any) {
      return (
        <SystemMessage
          {...props}
          wrapperStyle={styles.systemMessageWrapper}
          textStyle={styles.systemMessageText}
        />
      );
    }

    function renderSend(props: any) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Send {...props}>
            <View style={styles.btnSend}>
              <Icon name="send" size={22} color="green" />
            </View>
          </Send>
        </View>
      );
    }

    function customtInputToolbar(props: any) {
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.toolbarContainer}
          primaryStyle={styles.toolbarPrimary}
        />
      );
    };



    return (
      <GiftedChat
        messagesContainerStyle={styles.messageContainer}
        messages={messages}
        onSend={handleSend}
        onInputTextChanged={() => {
          console.log(`Is Typing: ${isTyping}`);
          setIsTyping(!isTyping)
          console.log(`Is Typing: ${isTyping}`);
        }}
        user={{ _id: currentUser?.uid as string | number }}
        placeholder='Type message...'
        textInputProps={styles.composer}
        renderInputToolbar={props => customtInputToolbar(props)}
        alwaysShowSend
        showUserAvatar
        scrollToBottom
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderLoading={renderLoading}
        scrollToBottomComponent={scrollToBottomComponent}
        renderSystemMessage={renderSystemMessage}
      />
    );
}