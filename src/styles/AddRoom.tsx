import { StyleService } from '@ui-kitten/components';

export const AddRoomStyles = StyleService.create({
    container: {
        height: '100%',
        backgroundColor: 'background-basic-color-4',
        alignItems: 'flex-end',
        flex: 1
    },
     closeButtonContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    title: {
        marginBottom: 10
    },
    input: {
        width: '75%',
        marginBottom: 7.5,
        borderRadius: 5
    },
    buttonLabel: {
        width: '50%',
        borderRadius: 25,
        marginTop: 10,
        borderColor: 'color-warning-500',
        backgroundColor: 'background-basic-color-4'
    }
});