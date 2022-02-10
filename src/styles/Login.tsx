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
        width: '70%',
        borderRadius: 7.5,
        overflow: 'hidden',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 62.5,
    },
    button: {
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderRadius: 25,
        height: 48
    },
    SocialButtonFacebook: {
        marginTop: 20,
        marginLeft: 25,
        marginRight: 25,
        width: 150,
        borderRadius: 0,
    },
    SocialButtonGoogle: {
        marginTop: 20,
        marginLeft: 25,
        marginRight: 25,
        width: 150,
        borderRadius: 0,
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15
    }
});