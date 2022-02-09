// Import root functionality & ui components
import React, { useState } from 'react';
import { Alert, Image, ImageStyle, TouchableWithoutFeedback, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme, Button, Text, useStyleSheet } from '@ui-kitten/components';

import { Input } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';

// Import styles.
import * as Styling from '../styles';

import { SignupScreenProps } from '../types';
import { app, auth, nonSocial } from '../firebase/firebase';
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
    const [name, setName] = useState('');
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
   * Create the show/hide password icon for the password input.
   */
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} color={theme['color-basic-600']} size={22} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const onFooterLinkPress = () => {
      props.navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if(password !== confirmPassword)
    {
      Alert.alert('Passwords do not match!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
      })
      .catch((error) => {
        const code = error.code;
        const message = error.message;

        // Send info to logging service
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
          <Image
            style={styles.logo as ImageStyle}
            source={require('../images/chat.png')}
            resizeMode='contain'
          />

          <Input
            style={styles.input}
            placeholder='Name'
            onChangeText={(text) => setName(text)}
            value={name}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />

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

          <Button style={styles.button} appearance='filled' status='primary' onPress={() => onRegisterPress()}>
            Create Account
          </Button>

          <View style={styles.footerView}>
              <Text>
                Already got an account? <Text onPress={onFooterLinkPress} status='info' style={{fontWeight: 'bold'}}>Log in</Text>
              </Text>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
};