/**
 * Interface Imports.
 */
import { UserInfo } from '@firebase/auth';
import { User } from 'react-native-gifted-chat';

/**
 * Native stack props.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";


/**
 * Default Navigation props.
 */
export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    ChatRoom: {
        thread: any,
    };
    AddRoom: undefined;
};

/**
 * Default context props for the auth provider.
 */
export type ContextProps = {
    user: UserInfo | null;
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    socialsFacebookProvider: () => void;
    socialsGoogleProvider: () => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, displayName: string) => void;
    logout: () => void;
}

/**
 * Chatroom definition.
 */
export type ChatRoom = {
    name: string;
    description: string;
    latestMessage: {
        createdAt: number;
        text: string;
    };
}

/**
 * Screen props per view.
 */
export type AddRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRoom'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatRoomsScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;