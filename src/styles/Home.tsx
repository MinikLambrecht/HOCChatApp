import { StyleService } from '@ui-kitten/components';

export const HomeStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-4',
        paddingTop: 5,
        paddingBottom: 20,
    },
    ListItem: {
        borderRadius: 25,
        marginBottom: 5,
        marginHorizontal: 15,
        borderWidth: 4,
        borderColor: 'background-basic-color-2'
    },
    listTitle: {
        fontSize: 22
    },
    listDescription: {
        fontSize: 16
    }
});