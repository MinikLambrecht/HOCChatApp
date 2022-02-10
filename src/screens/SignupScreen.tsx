/**
 * React Imports.
 */
import React, { useState } from 'react';

/**
 * Component & UI Imports.
 */
import { Alert, Image, ImageStyle, TouchableWithoutFeedback, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Divider from 'react-native-divider';
import { Button, Text, Input } from '@ui-kitten/components';

/**
 * Icon Imports.
 */
import Icon from 'react-native-vector-icons/Ionicons';
import SocialIcons from 'react-native-vector-icons/FontAwesome'

/**
 * Style Imports.
 */
import * as Styling from '../styles';
import { useTheme, useStyleSheet } from '@ui-kitten/components';

/**
 * Type Imports.
 */
import { SignupScreenProps } from '../types';

/**
 * Authentication Imports.
 */
import { app, auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

/**
 * 
 * @param props Navigation Props
 * @returns Signup Screen
 */
export default function Signup(props: SignupScreenProps) {
  /**
   * State values for signup form.
   */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * State values for the password input.
   */
  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  
  /**
   * Get the stylesheet for the current screen,
   * and get the current theme for possible future 
   * variable access.
   */
  const styles = useStyleSheet(Styling.SignupStyles);
  const theme  = useTheme();

  /**
   * Toggle functionality for the password input.
   */
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  /**
   * Render the show / hide password icon.
   */
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} color={theme['color-basic-600']} size={22} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  /**
   * Navigation link to the Login page.
   */
  const onFooterLinkPress = () => {
      props.navigation.navigate('Login')
  }

  /**
   * 
   * @returns New user object & navigates to Chat area.
   */
  const onRegisterPress = () => {
    if(password !== confirmPassword)
    {
      Alert.alert('Passwords do not match!', 'Passwords do not match, try again!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed In
        const userObj = res.user;
        
        props.navigation.navigate('Chats', userObj);

      })
      .catch((error) => {
        switch(error.code)
          {
            case 'auth/wrong-password':
              Alert.alert('Wrong password', 'Wrong password, please try again or contact an administrator!');
              break;

            case 'auth/weak-password':
              Alert.alert('Weak Password!', 'Password should be at least 6 characters');
            break;

            case 'auth/user-not-found':
              Alert.alert('Wrong E-mail', 'Wrong E-mail, please try again or contact an administrator!');
            break;

            case 'auth/invalid-email':
              Alert.alert('Invalid E-mail', 'The E-mail was formatted wrong, try again or contact an administrator!');
            break;

            case 'auth/email-already-in-use':
              Alert.alert('E-mail in use', 'This E-mail has been taken, try again!')
            break;

            case 'auth/too-many-requests':
              Alert.alert('Too Many Requests!', 'This account has temporarily been disabled due to many failed login attempts. You can immediately restore it by resetting your passsword or try again later.')
            break;

            case 'auth/internal-error':
              Alert.alert('Internal Error', 'An unexpected error occured while trying to process the request. Try again, or contact an administrator!')
            break;

            default:
              Alert.alert(error.code, `Error message: \n${error.message}`);
            break;
        }
      }
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo as ImageStyle}
          source={require('../images/chat.png')}
          resizeMode='contain' />

        <Input
          style={styles.input}
          placeholder='E-mail'
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <Input
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          accessoryRight={renderIcon}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <Input
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          accessoryRight={renderIcon}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <Button style={styles.button} appearance='outline' status='warning' onPress={() => onRegisterPress()}>
          Create Account
        </Button>

        <View style={styles.footerView}>
            <Text>
              Already got an account? <Text onPress={onFooterLinkPress} status='info' style={{fontWeight: 'bold'}}>Log in</Text>
            </Text>
        </View>

        <Divider orientation="center">
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Or
            </Text>
        </Divider>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button style={styles.SocialButtonGoogle} appearance='outline' status='danger'>
            <SocialIcons name='google' />
          </Button>

          <Button style={styles.SocialButtonFacebook} appearance='outline' status='info'>
            <SocialIcons name='facebook' />
          </Button>
        </View>

      </KeyboardAwareScrollView>
    </View>
  );
};