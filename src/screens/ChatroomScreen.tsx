// Import root functionality & ui components
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

// Import styles.
import * as Styling from '../styles';

export default function Chatroom() {
  const styles = Styling.ChatroomStyle;

  return (
    <Layout style={styles.root}>
        <Text>
            ChatroomScreen
        </Text>
    </Layout>
  );
};