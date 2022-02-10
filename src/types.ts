import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { User } from "firebase/auth";

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Chats: User;
    ChatRooms: undefined;
}

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;
export type ChatsScreenProps = NativeStackScreenProps<RootStackParamList, 'Chats'>;
export type ChatRoomsScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatRooms'>;