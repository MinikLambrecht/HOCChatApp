import { StyleService } from '@ui-kitten/components';

export const LoginStyles = StyleService.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'background-basic-color-1',
        alignItems: 'center',
        flex: 1
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    }
});