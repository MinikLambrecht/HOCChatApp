// Import root functionality & ui components.
import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

// Import styles.
import * as Styling from '../styles';

export default function Error() {
  const styles = Styling.ErrorStyles;

  return (
    <Layout style={styles.root}>
        <Text>
            Error!
        </Text>
    </Layout>
  );
};