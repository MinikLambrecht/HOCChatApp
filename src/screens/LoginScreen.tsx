// Import root functionality & ui components
import React, { useState } from 'react'
import { Image, ImageStyle, TouchableWithoutFeedback, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme, useStyleSheet, Input, Text, Button } from '@ui-kitten/components';

import Icon from 'react-native-vector-icons/Ionicons';

// Import styles.
import * as Styling from '../styles';

import { LoginScreenProps } from '../types';

export default function Login(props: LoginScreenProps) {
  /**
   * State values for signup form.
   */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const onFooterLinkPress = () => {
    props.navigation.navigate('Signup')
  }

  const onLoginPress = () => {
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
          
          <Button style={styles.button} appearance='filled' status='primary' onPress={() => onLoginPress()}>
            Log In
          </Button>

          <View style={styles.footerView}>
              <Text>
                Don't have an account? <Text onPress={onFooterLinkPress} status='info' style={{fontWeight: 'bold'}}>Sign up</Text>
              </Text>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
};