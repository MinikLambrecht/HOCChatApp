import { StyleService } from "@ui-kitten/components";

export const ChatroomStyle = StyleService.create({
    messageContainer: {
        backgroundColor: 'background-basic-color-4'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'color-primary-700',
        borderRadius: 25
    },
    bottomComponentIcon: {
        color: 'color-basic-100',
    },
    systemMessageWrapper: {
        backgroundColor: 'transparent',
        borderRadius: 4,
        padding: 5
    },
    toolbarContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: 48,
        borderTopWidth: 0,
        backgroundColor: 'background-basic-color-2'
    },    
    toolbarPrimary: {
        backgroundColor: 'background-basic-color-2',
        borderTopWidth: 0,
    },
    composer:{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 5,
        borderWidth: 3,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        borderColor: 'background-basic-color-3',
        backgroundColor: 'background-basic-color-4'
        
    },
    btnSend: {
        backgroundColor: 'background-basic-color-4',
        height: 42,
        width: 42,
        marginBottom: 2,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: 'background-basic-color-3',
        color: 'color-primary-700'
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
    }
});