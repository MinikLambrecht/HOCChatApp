/**
 * React Imports.
 */
import React, { useContext, useState } from 'react'

/**
 * Component & UI Imports.
 */
import { Image, ImageStyle, TouchableWithoutFeedback, View } from 'react-native';
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
import { LoginScreenProps } from '../types';

/**
 * Authentication Imports.
 */
import { AuthContext } from '../navigation/AuthProvider';


/**
 * 
 * @param props Navigation Props
 * @returns Login Screen
 */
export const Login: React.FC<LoginScreenProps> = (props) => {
  /**
   * State values for signup form.
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useContext(AuthContext)?.login;
  const socialFacebook = useContext(AuthContext)?.socialsFacebookProvider;
  const socialGoogle = useContext(AuthContext)?.socialsGoogleProvider;

  /**
   * State values for the password input.
   */
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  /**
   * Get the stylesheet for the current screen,
   * and get the current theme for possible future 
   * variable access.
   */
  const styles = useStyleSheet(Styling.LoginStyles);
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

  // Link logic
  const onFooterLinkPress = () => {
    props.navigation.navigate('Signup');
  }

  // Facebook loging logic.
  const onSocialFacebookPress = () => {
    socialFacebook()
  }

  // Google login logic.
  const onSocialGooglePress = () => {
    socialGoogle();
  }

  // Email & Password Login logic.
  const onLoginPress = () => {
    login(email, password);
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
          
          <Button style={styles.button} appearance='outline' status='warning' onPress={() => onLoginPress()}>
            Log In
          </Button>

          <View style={styles.footerView}>
              <Text>
                Don't have an account? <Text onPress={onFooterLinkPress} status='info' style={{fontWeight: 'bold'}}>Sign up</Text>
              </Text>
          </View>

          <Divider orientation="center">
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Or
              </Text>
          </Divider>

          <View style={styles.SocialsContianer}>
            <Button
              style={styles.SocialButtonGoogle}
              appearance='outline' status='danger'
              onPress={() => onSocialGooglePress()}
            >
              <SocialIcons name='google' />
            </Button>

            <Button
              style={styles.SocialButtonFacebook}
              appearance='outline'
              status='info' onPress={() => onSocialFacebookPress()}
            >
              <SocialIcons name='facebook' />
            </Button>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
};