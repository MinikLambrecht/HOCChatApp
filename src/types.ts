import { UserInfo } from '@firebase/auth';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    ChatRoom: {
        thread: any,
    };
    AddRoom: undefined;
};

export type ContextProps = {
    user: UserInfo | null;
    setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    socialsFacebookProvider: () => void;
    socialsGoogleProvider: () => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string, displayName: string) => void;
    logout: () => void;
}

export type ChatRoom = {
    name: string;
    description: string;
    latestMessage: {
        createdAt: number;
        text: string;
    };
}

export type AddRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'AddRoom'>;
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ChatRoomsScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>;