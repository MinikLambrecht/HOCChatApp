/**
 * React Imports.
 */
import React from 'react';

/**
 * UI & Component imports.
 */
import { View, ActivityIndicator } from 'react-native';

/**
 * Style Imports.
 */
import { useStyleSheet } from '@ui-kitten/components';
import * as Styling from '../styles';

/**
 * 
 * @returns Loading Spinner Component.
 */
export default function Loading() {
    const styles = useStyleSheet(Styling.LoadingStyles);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large'/>
    </View>
  );
}