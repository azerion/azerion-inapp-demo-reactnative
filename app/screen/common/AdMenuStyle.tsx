import { StyleSheet } from "react-native";

const AdMenuStyle = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        padding: 10,
        height: '100%',
    },
    header: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerRightButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 0,
    },
    TopMenuButton: {
        marginLeft: 10,
    },
    adContainer: {
        backgroundColor: '#FFF',
    },
    adButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 10,
    },
    adTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
        marginBottom: 10,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#555',
        paddingHorizontal: 5,
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
    },
    actionButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    bannerAd: {
        alignItems: 'center',
        flex: 1,
    },
});

export default AdMenuStyle;