/**
 * React Imports.
 */
import React, { useContext, useState, useEffect } from 'react';

/**
 * Component & UI Imports.
 */
import Loading from '../components/Loading';

/**
 * Navigation Imports.
 */
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

/**
 * Context Imports.
 */
import { AuthContext } from './AuthProvider';

/**
 * Authentication Imports.
 */
import { auth } from '../firebase/firebase';


/**
 * 
 * @returns Complete navigation stack.
 */
export default function Routes() {
  const { user, setUser } = useContext (AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  /**
   * Handle user state changes.
   * @param user user object.
   */
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  /**
   * Listen for authentication changes, such as loogin and logout.
   */
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}