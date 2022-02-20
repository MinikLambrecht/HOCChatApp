/**
 * React Imports.
 */
import React, { useContext, useState } from 'react';

/**
 * Component & UI Imports.
 */
import { Alert, Image, ImageStyle, TouchableWithoutFeedback, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Divider from 'react-native-divider';
import { Button, Input } from '@ui-kitten/components';

/**
 * Icon Imports.
 */
import Icon from 'react-native-vector-icons/Ionicons';

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
import { AuthContext } from '../navigation/AuthProvider';


/**
 * 
 * @param props Navigation Props
 * @returns Signup Screen
 */
export const Signup: React.FC<SignupScreenProps> = (props) => {
  /**
   * State values for signup form.
   */
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * State values for the password input.
   */
  const [primarySecureTextEntry, setPrimarySecureTextEntry] = React.useState(true);
  const [secondarySecureTextEntry, setSecondarySecureTextEntry] = React.useState(true);
  
  /**
   * Get the stylesheet for the current screen,
   * and get the current theme for possible future 
   * variable access.
   */
  const styles = useStyleSheet(Styling.SignupStyles);
  const theme  = useTheme();

  const register = useContext(AuthContext)?.register;

  /**
   * Toggle functionality for the password input.
   */
  const togglePrimarySecureEntry = () => {
    setPrimarySecureTextEntry(!primarySecureTextEntry);
  };

  const toggleSecondarySecureEntry = () => {
    setSecondarySecureTextEntry(!secondarySecureTextEntry);
  };

  /**
   * Render the show / hide password icon.
   */
  const renderPrimaryIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={togglePrimarySecureEntry}>
      <Icon {...props} color={theme['color-basic-600']} size={22} name={primarySecureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  const renderSecondaryIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecondarySecureEntry}>
      <Icon {...props} color={theme['color-basic-600']} size={22} name={secondarySecureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

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
    else
    {
      register(email, password, displayName);
    }
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
          placeholder='Display Name'
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
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
          secureTextEntry={primarySecureTextEntry}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          accessoryRight={renderPrimaryIcon}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <Input
          style={styles.input}
          secureTextEntry={secondarySecureTextEntry}
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          accessoryRight={renderSecondaryIcon}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <Button style={styles.button} appearance='outline' status='warning' onPress={() => onRegisterPress()}>
          Create Account
        </Button>

      </KeyboardAwareScrollView>
    </View>
  );
};