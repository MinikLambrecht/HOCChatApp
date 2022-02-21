/**
 * React Imports.
 */
import React, { createContext, useState } from "react";

/**
 * UI & Component imports.
 */
import { Alert } from 'react-native';

/**
 * Authentication Imports.
 */
import {createUserWithEmailAndPassword,
        FacebookAuthProvider,
        GoogleAuthProvider,
        signInWithCredential,
        signInWithEmailAndPassword,
        updateProfile,
        UserInfo} from 'firebase/auth';

import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { auth } from "../firebase/firebase";


/**
 * Type Imports.
 */
import { ContextProps } from "../types";

/**
 * Initialize authentication context.
 */
export const AuthContext = createContext<ContextProps | null>(null);

// Configure GoogleSignin.
GoogleSignin.configure({
    webClientId: '105020753017-r87ckhse9jmdo7m4dsfb4f1a10pboco2.apps.googleusercontent.com'
});

/**
 * Facebook login function.
 */
const socialsFacebookProvider = async () =>
{
    try
    {
        // Login the User and get his public profile and email id.
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
        ]);

        /**
         * If the user cancels the login process, the result will have a
         * isCancelled boolean set to true. We can use that to break out of this function.
         */
        if (result.isCancelled)
        {
            Alert.alert(
                'Process cancelled',
                'Use cancelled the login process!'
            );
        }

        // Get the access token.
        const data = await AccessToken.getCurrentAccessToken();

        // If we don't get the access token, then something has gone wrong.
        if (!data)
        {
            Alert.alert(
                'Error', 
                'Something went wrong obtaining the access token!'
            );
        }

        // Use the access token to create a facebook credential.
        const facebookCredential = FacebookAuthProvider.credential(data?.accessToken as string);

        await signInWithCredential(auth, facebookCredential);
    }
    catch(e: any)
    {
        switch(e)
        {
            case 'auth/account-exists-with-different-credential':
                Alert.alert(
                    'Use exists!',
                    'The account does already exist'
                );
            break;

            default:
                Alert.alert(
                    'Unexpected error!',
                    `An unexpected error has occurred, try again or contact an administrator! \n ${e.message}`
                );
            break;
        }
    }
}

/**
 * Google login function.
 */
const socialsGoogleProvider = async () =>
{
    try
    {
        // Get the user ID Token.
        const { idToken } = await GoogleSignin.signIn();
        
        // Use the ID Token to create a google credential.
        const googleCredential = GoogleAuthProvider.credential(idToken);

        await signInWithCredential(auth, googleCredential);
    }
    catch(e: any)
    {
        switch(e.code)
        {
            case statusCodes.SIGN_IN_CANCELLED:
                Alert.alert(
                    'Process cancelled',
                    'Use cancelled the login process!'
                );
            break;

            case statusCodes.IN_PROGRESS:
                Alert.alert(
                    'Already in progress',
                    `You're already trying to login please wait.`
                );
            break;

            default:
                Alert.alert(
                    'Unexpected error!',
                    `An unexpected error has occurred, try again or contact an administrator! \n ${e.message}`
                );
            break;
        }
    }
}

/**
 * Default Email & Password Login funciton.
 * @param email string
 * @param password string
 */
const login = async (email: string, password: string) =>
{
    try
    {
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                return true;
            })
            .catch((error) => {
                switch(error.code)
                {
                    case 'auth/wrong-password':
                        Alert.alert(
                            'Wrong password',
                            'Wrong password, please try again or contact an administrator!'
                        );
                    break;

                    case 'auth/user-not-found':
                        Alert.alert(
                            'Wrong E-mail',
                            'Wrong E-mail, please try again or contact an administrator!'
                        );
                    break;

                    case 'auth/invalid-email':
                        Alert.alert(
                            'Invalid E-mail',
                            'The E-mail was formatted wrong, try again or contact an administrator!'
                        );
                    break;

                    case 'auth/too-many-requests':
                        Alert.alert(
                            'Too Many Requests!',
                            'This account has temporarily been disabled due to many failed login attempts. You can immediately restore it by resetting your passsword or try again later.'
                        );
                    break;

                    case 'auth/internal-error':
                        Alert.alert(
                            'Internal Error',
                            'An unexpected error occured while trying to process the request. Try again, or contact an administrator!'
                        );
                    break;

                    default:
                        Alert.alert(
                            error.code,
                            error.message
                        );
                    break;
                }
            });
    } 
    catch (e)
    {
        Alert.alert(
            'Unexpected error!',
            'An unexpected error has occurred, try again or contact an administrator!'
        );
    }
}

/**
 * Register a new user with email & password.
 * @param email string
 * @param password string
 * @param displayName string
 */
const register = async (email: string, password: string, displayName: string) =>
{
    try
    {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                updateProfile(res?.user, {
                    displayName: displayName,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/hoc-chatapp-522b8.appspot.com/o/User_Avatars%2FNoAvatar.png?alt=media&token=8258ab20-c8da-4617-8615-6c60ea6dd907"
                })
                .catch((error) => {
                    Alert.alert(
                        error.code,
                        `Error message: \n${error.message}`
                    );
                });

                return true;
            })
            .catch((error) => {
                switch(error.code)
                {
                    case 'auth/wrong-password':
                        Alert.alert(
                            'Wrong password',
                            'Wrong password, please try again or contact an administrator!'
                        );
                    break;

                    case 'auth/weak-password':
                        Alert.alert(
                            'Weak Password!',
                            'Password should be at least 6 characters'
                        );
                    break;

                    case 'auth/user-not-found':
                        Alert.alert(
                            'Wrong E-mail',
                            'Wrong E-mail, please try again or contact an administrator!'
                        );
                    break;

                    case 'auth/invalid-email':
                        Alert.alert(
                            'Invalid E-mail',
                            'The E-mail was formatted wrong, try again or contact an administrator!'
                        );
                    break;

                    case 'auth/email-already-in-use':
                        Alert.alert(
                            'E-mail in use',
                            'This E-mail has been taken, try again!'
                        );
                    break;

                    case 'auth/too-many-requests':
                        Alert.alert(
                            'Too Many Requests!',
                            'This account has temporarily been disabled due to many failed login attempts. You can immediately restore it by resetting your passsword or try again later.'
                        );
                    break;

                    case 'auth/internal-error':
                        Alert.alert(
                            'Internal Error',
                                'An unexpected error occured while trying to process the request. Try again, or contact an administrator!'
                        );
                    break;

                    default:
                        Alert.alert(
                            error.code,
                            `Error message: \n${error.message}`
                        );
                    break;
                }
            });
    }
    catch (e: any)
    {
        Alert.alert(
            'Unexpected error!',
            'An unexpected error has occurred, try again or contact an administrator!'
        );
    }
}

/**
 * Logout the current user.
 */
const logout = async () =>
{
    try
    {
        await auth.signOut();
    }
    catch (e: any)
    {
        Alert.alert(
            'Unexpected error!',
            e.message
        );
    }
}

/**
 * @param children child element props.
 * @returns Auth Provider with the context for easy access in the future.
 */
export const AuthProvider: React.FC = ({ children }) => {
    const [ user, setUser ] = useState<UserInfo | null>(null);

    return (
        <AuthContext.Provider value={{
            user, 
            setUser, 
            socialsFacebookProvider, 
            socialsGoogleProvider, 
            login, 
            register, 
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}